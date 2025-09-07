
import { useState, useCallback } from 'react';
import { editImageWeather } from '../services/geminiService';

interface EditHistory {
    imageData: string;
    prompt: string;
}

export const useImageEditing = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [history, setHistory] = useState<EditHistory[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [originalFile, setOriginalFile] = useState<File | null>(null);

    const editedImage = historyIndex > -1 ? history[historyIndex]?.imageData : null;
    const canUndo = historyIndex > -1;
    const canRedo = historyIndex < history.length - 1;

    const reset = useCallback(() => {
        setOriginalImage(null);
        setIsLoading(false);
        setError(null);
        setOriginalFile(null);
        setHistory([]);
        setHistoryIndex(-1);
    }, []);

    const setImageFile = useCallback((file: File | null) => {
        if (!file) {
            reset();
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('The provided file is not a supported image type.');
            return;
        }

        setOriginalFile(file);
        setHistory([]);
        setHistoryIndex(-1);
        setError(null);
        const reader = new FileReader();
        reader.onloadend = () => {
            setOriginalImage(reader.result as string);
        };
        reader.onerror = () => {
             setError("Failed to read the image file.");
        }
        reader.readAsDataURL(file);
    }, [reset]);

    const processImage = useCallback(async (prompt: string) => {
        if (!originalImage || !originalFile) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const base64Data = originalImage.split(',')[1];
            if (!base64Data) {
                throw new Error("Invalid image data format.");
            }

            const newImageData = await editImageWeather(base64Data, originalFile.type, prompt);
            const newImageSrc = `data:${originalFile.type};base64,${newImageData}`;

            const newHistoryEntry: EditHistory = { imageData: newImageSrc, prompt };
            const newHistory = [...history.slice(0, historyIndex + 1), newHistoryEntry];

            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "An unknown error occurred during image processing.");
        } finally {
            setIsLoading(false);
        }
    }, [originalImage, originalFile, history, historyIndex]);

    const undo = useCallback(() => {
        if (canUndo) {
            setHistoryIndex(prev => prev - 1);
        }
    }, [canUndo]);

    const redo = useCallback(() => {
        if (canRedo) {
            setHistoryIndex(prev => prev + 1);
        }
    }, [canRedo]);

    return {
        originalImage,
        editedImage,
        isLoading,
        error,
        setImageFile,
        processImage,
        reset,
        undo,
        redo,
        canUndo,
        canRedo,
        originalFile,
    };
};