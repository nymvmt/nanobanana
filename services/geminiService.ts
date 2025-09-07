import { GoogleGenAI, Modality } from '@google/genai';

if (!process.env.API_KEY) {
    // This is a fallback for development. In a real environment, the build process should handle this.
    console.warn("API_KEY environment variable is not set. The application might not work as expected.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-image-preview';

export const editImageWeather = async (
    base64ImageData: string,
    mimeType: string,
    userPrompt: string
): Promise<string> => {
    try {
        const masterPrompt = `You are an expert photo-editing AI specializing in photorealistic weather and lighting manipulation. Your task is to change the weather in the provided image to match the user's description: "${userPrompt}".

Your primary goal is to create a seamless and believable final image where the original subjects are perfectly integrated into the new environment.

Follow these rules STRICTLY:

**1. PRESERVE THE SUBJECTS (NON-NEGOTIABLE):**
*   You **MUST NOT** change any person, character, or animal in the image. Every aspect of them must remain IDENTICAL to the original.
*   **FACE & EXPRESSION:** The face and facial expression must be a 1:1, pixel-perfect copy of the original. DO NOT alter them.
*   **POSE & CLOTHING:** The body pose, position, and clothing must not be changed.
*   **OBJECTS:** Any objects held by or near the subject must also be preserved.

**2. REALISTIC LIGHTING & ATMOSPHERE INTEGRATION (CRITICAL):**
*   This is the most important rule. The final image will be judged on how realistically the subject is integrated into the new environment.
*   You **MUST** completely re-render the lighting, shadows, and color on the original subjects to perfectly match the new weather, time of day, and atmosphere described in "${userPrompt}".
*   **Changing the lighting on the subject is NOT a violation of Rule #1.** It is a mandatory part of the editing process. You are preserving the subject's form, pose, and identity, but adapting its appearance to the new scene.
*   **For Day-to-Night transformations (e.g., 'Starry Night'):** This is a critical and difficult task.
    *   **Eliminate Daylight:** The subject CANNOT look like they are standing in sunlight. All harsh highlights and sharp shadows from the sun MUST be removed.
    *   **Introduce Night Lighting:** Re-light the subject with plausible night-time light sources. This could be soft, cool, diffused light from the moon and starry sky. It could be warm light from a nearby window or streetlamp if present in the scene. The lighting should be directional and create soft highlights.
    *   **Shadows:** Shadows at night are very soft, long, and often blurry. Drastically soften and darken the shadows on and around the subject.
    *   **Color Temperature:** Shift the color balance of the subject and the scene towards cooler tones (blues and purples) unless there is a warm artificial light source.
*   **For other weather changes (e.g., Sunny to Stormy):**
    *   **Light Quality:** Sunlight becomes diffused and scattered by clouds. Soften highlights and shadows on the subject.
    *   **Color Grading:** Desaturate colors slightly and shift towards a cooler, more dramatic color palette.

**3. ALLOWED ENVIRONMENTAL CHANGES:**
*   You are ONLY permitted to change elements related to the weather and atmosphere. This includes:
    *   The sky (e.g., from clear to stormy, day to night).
    *   Overall lighting, color grading, and contrast of the entire scene.
    *   Weather effects like rain, fog, snow, or mist.

**4. FORBIDDEN CHANGES:**
*   Do not add, remove, or reposition any objects or subjects.
*   Do not change the fundamental composition, architecture, or landscape of the scene (unless directly related to weather, e.g., adding snow on the ground).

Your final output must be only the edited image file. Do not add any text or explanation.`;
        
        const response = await ai.models.generateContent({
            model,
            contents: {
                parts: [
                    { inlineData: { data: base64ImageData, mimeType } },
                    { text: masterPrompt }
                ]
            },
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