import { GoogleGenAI, Modality, Part } from '@google/genai';

if (!process.env.API_KEY) {
    // This is a fallback for development. In a real environment, the build process should handle this.
    console.warn("API_KEY environment variable is not set. The application might not work as expected.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-image-preview';

const getMasterPrompt = (userPrompt: string, hasMask: boolean) => {
    const isDarkPrompt = (prompt: string): boolean => {
        const keywords = ['night', 'sunset', 'storm', 'dark', 'aurora'];
        return keywords.some(k => prompt.toLowerCase().includes(k));
    };

    const lightingInstruction = isDarkPrompt(userPrompt)
        ? `**For this dark scene, you MUST add a subtle, natural-looking light source illuminating the people.** This prevents them from being lost in shadow and makes them the focal point. The light should look realistic, as if from the moon, a distant street lamp, or a warm glow. It must be soft and not a harsh spotlight.`
        : `It should be a gentle color shift or shadow adjustment, NOT a re-drawing of their features.`;

    if (hasMask) {
        return `You are a meticulous photo retoucher AI. Your single most important job is to preserve the people in the photo perfectly, especially their faces. Any change to a person's face, identity, or expression is a total failure.

You have three inputs: an original image, a mask, and a text prompt: "${userPrompt}".

Your task is to apply the text prompt's effect ONLY to the WHITE areas of the mask.

**ABSOLUTE, NON-NEGOTIABLE RULES - DO NOT BREAK:**

1.  **PIXEL-PERFECT PRESERVATION IN BLACK AREAS:** Any part of the original image corresponding to a BLACK area on the mask MUST remain completely untouched. It must be a pixel-for-pixel copy of the original. This is a strict requirement.

2.  **CAREFUL EDITS IN WHITE AREAS:** In the WHITE areas of the mask, apply the effect from the prompt: "${userPrompt}".

3.  **PEOPLE ARE ALWAYS PROTECTED (HIGHEST PRIORITY):** This rule overrides all others.
    *   **If a person is in a BLACK area:** They are already protected by Rule #1. Do not touch them.
    *   **If a person is in a WHITE area:** You MUST preserve their identity, face, expression, pose, and clothing perfectly. The ONLY change you are allowed to make is to *subtly adjust the lighting and shadows on them* to match the new atmosphere. ${lightingInstruction}

**Failure condition:** If you alter the identity or facial expression of any person, OR if you change anything in the black masked areas, you have failed the task.

Produce only the final image. No text.`;
    }

    return `You are a meticulous photo retoucher AI. Your single most important job is to preserve the people in the photo perfectly, especially their faces. Any change to a person's face, identity, or expression is a total failure.

**PRIMARY OBJECTIVE: Change the weather and atmosphere.**
Apply the following effect to the image: "${userPrompt}".
This means you should change:
- The sky.
- The overall lighting and color grade of the entire scene.
- Add atmospheric effects like rain, snow, fog, etc. if requested.

**ABSOLUTE, NON-NEGOTIABLE RULES - DO NOT BREAK:**
1.  **DO NOT CHANGE PEOPLE:** You must preserve every person in the image with perfect accuracy.
    *   **FACES & IDENTITY:** The person's face, features, and identity MUST remain 100% identical to the original. DO NOT change their facial expression.
    *   **POSE & CLOTHING:** The person's pose, clothes, and position must not be altered.
2.  **DO NOT CHANGE OBJECTS:** Do not add, remove, or alter any objects, buildings, or landscape features that are not directly related to the weather effect.
3.  **REALISTICALLY ADJUST LIGHTING ON PEOPLE:** To make the image look realistic, you MUST subtly adjust the lighting and shadows on the people to match the new atmosphere. This is the ONLY permitted change to a person.
    *   ${lightingInstruction}

**Failure condition:** If you alter the identity or facial expression of any person, you have failed the task.

Produce only the final image. No text.`;
};


export const editImageWeather = async (
    base64ImageData: string,
    mimeType: string,
    userPrompt: string,
    maskBase64Data?: string | null
): Promise<string> => {
    try {
        const masterPrompt = getMasterPrompt(userPrompt, !!maskBase64Data);

        const parts: Part[] = [
            { inlineData: { data: base64ImageData, mimeType } }
        ];

        if (maskBase64Data) {
            parts.push({ inlineData: { data: maskBase64Data, mimeType: 'image/png' } });
        }
        
        parts.push({ text: masterPrompt });
        
        const response = await ai.models.generateContent({
            model,
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT]
            }
        });

        if (response.candidates && response.candidates.length > 0 && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                    return part.inlineData.data;
                }
            }
        }

        throw new Error("The AI did not return an edited image. The prompt might have been blocked. Try a different prompt or image.");

    } catch (error) {
        console.error("Gemini API Error:", error);
        if (error instanceof Error && error.message.includes('API key')) {
             throw new Error("There is an issue with the API configuration. Please ensure the API key is valid.");
        }
        throw new Error("Failed to communicate with the AI model. Please try again later.");
    }
};