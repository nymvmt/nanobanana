import { GoogleGenAI, Modality, Part } from '@google/genai';

if (!process.env.API_KEY) {
    // This is a fallback for development. In a real environment, the build process should handle this.
    console.warn("API_KEY environment variable is not set. The application might not work as expected.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-image-preview';

const getMasterPrompt = (userPrompt: string, hasMask: boolean) => {
    if (hasMask) {
        return `You are an expert photo-editing AI. Your absolute, most important, non-negotiable rule is to PRESERVE all people and faces perfectly.

You have been provided with THREE inputs:
1. The original image.
2. A black-and-white mask image.
3. A user's text prompt: "${userPrompt}".

Your task is to apply the visual effect described in the user's prompt ONLY to the areas of the original image that correspond to the WHITE sections of the mask image.

Follow these rules STRICTLY:

**RULE #1: PRESERVE PEOPLE & FACES (ABSOLUTE PRIORITY):**
*   If any part of a person, especially their face or expression, is inside the WHITE (edited) area of the mask, you **MUST NOT** change them. They must be preserved perfectly.
*   You are, however, required to realistically re-render the **lighting, shadows, and color** on these subjects to match the new atmosphere. This is the ONLY change permitted to a person. Altering their identity, pose, or expression is a failure.

**RULE #2: MASKED AREA EDITS:**
*   Within the WHITE areas of the mask, perform the photo edit as described in "${userPrompt}".
*   This includes changing the sky, lighting, atmosphere, and adding weather effects.
*   The transition between the edited (white) and unedited (black) areas must be seamless and photorealistic.

**RULE #3: UNMASKED AREA PRESERVATION (NON-NEGOTIABLE):**
*   The areas of the original image that correspond to the BLACK sections of the mask image **MUST REMAIN COMPLETELY UNCHANGED**. They must be a pixel-perfect copy of the original image in those areas.

Your final output must be only the edited image file. Do not add any text or explanation.`;
    }

    return `You are an expert photo-editing AI. Your absolute, most important, non-negotiable rule is to PRESERVE all people and faces perfectly.

Your task is to change the weather in the provided image to match the user's description: "${userPrompt}".

Follow these rules STRICTLY:

**GOLDEN RULE: PRESERVE THE SUBJECTS (NON-NEGOTIABLE, HIGHEST PRIORITY):**
*   You **MUST NOT** change any person, character, or animal in the image. Every aspect of them must remain IDENTICAL to the original.
*   **FACE & EXPRESSION:** The face and facial expression MUST NOT BE ALTERED in any way. This is the most critical instruction. Failure to follow this rule means the entire task has failed.
*   **POSE & CLOTHING:** The body pose, position, and clothing must not be changed.

**RULE #2: REALISTIC LIGHTING INTEGRATION (CRITICAL):**
*   While preserving the subject's identity (Rule #1), you **MUST** re-render the lighting, shadows, and color on the subject to perfectly match the new weather and atmosphere.
*   **Changing the lighting on the subject is NOT a violation of the Golden Rule.** It is a mandatory part of the process. You are preserving the subject's form and identity but adapting its appearance to the new scene.
*   For day-to-night transformations, this is crucial. Remove all daylight highlights from the subject and re-light them with plausible night-time sources (e.g., moonlight, ambient light).

**RULE #3: ALLOWED ENVIRONMENTAL CHANGES:**
*   You are ONLY permitted to change elements related to the weather and atmosphere. This includes the sky, overall lighting, color grading, and weather effects (rain, snow, etc.).

**RULE #4: FORBIDDEN CHANGES:**
*   Do not add, remove, or reposition any objects or subjects.
*   Do not change the fundamental composition or landscape of the scene.

Your final output must be only the edited image file. Do not add any text or explanation.`;
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