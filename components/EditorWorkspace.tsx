import React, { useState, useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useImageEditing } from '../hooks/useImageEditing';
import { WEATHER_PRESETS, BrushIcon, EraserIcon, ClearIcon } from '../constants';
import ImageComparator from './ImageComparator';

// --- START of MaskingCanvas.tsx content ---
// Note: This is a new component, included here to avoid creating a new file.

interface MaskingCanvasProps {
    width: number;
    height: number;
    brushSize: number;
    isErasing: boolean;
}

interface MaskingCanvasRef {
    getMaskAsBase64: () => string | null;
    clearMask: () => void;
}

const MaskingCanvas = forwardRef<MaskingCanvasRef, MaskingCanvasProps>(
    ({ width, height, brushSize, isErasing }, ref) => {
        const displayCanvasRef = useRef<HTMLCanvasElement>(null);
        const maskCanvasRef = useRef<HTMLCanvasElement>(null);
        const isDrawing = useRef(false);
        const lastPoint = useRef<{ x: number; y: number } | null>(null);

        const getCanvasCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
            const canvas = displayCanvasRef.current;
            if (!canvas) return null;
            const rect = canvas.getBoundingClientRect();
            const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
            const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
            const displayCtx = displayCanvasRef.current?.getContext('2d');
            const maskCtx = maskCanvasRef.current?.getContext('2d');
            if (!displayCtx || !maskCtx) return;

            // --- Draw on Display Canvas (red overlay) ---
            displayCtx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
            displayCtx.beginPath();
            displayCtx.moveTo(x0, y0);
            displayCtx.lineTo(x1, y1);
            displayCtx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; // red-500
            displayCtx.lineWidth = brushSize;
            displayCtx.lineCap = 'round';
            displayCtx.lineJoin = 'round';
            displayCtx.stroke();

            // --- Draw on Mask Canvas (black & white) ---
            maskCtx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
            maskCtx.beginPath();
            maskCtx.moveTo(x0, y0);
            maskCtx.lineTo(x1, y1);
            maskCtx.strokeStyle = 'white';
            maskCtx.lineWidth = brushSize;
            maskCtx.lineCap = 'round';
            maskCtx.lineJoin = 'round';
            maskCtx.stroke();
        };

        const handleStartDrawing = (event: React.MouseEvent | React.TouchEvent) => {
            isDrawing.current = true;
            const point = getCanvasCoordinates(event);
            if(point) lastPoint.current = point;
        };

        const handleDrawing = (event: React.MouseEvent | React.TouchEvent) => {
            if (!isDrawing.current) return;
            event.preventDefault();
            const currentPoint = getCanvasCoordinates(event);
            if (currentPoint && lastPoint.current) {
                drawLine(lastPoint.current.x, lastPoint.current.y, currentPoint.x, currentPoint.y);
                lastPoint.current = currentPoint;
            }
        };

        const handleEndDrawing = () => {
            isDrawing.current = false;
            lastPoint.current = null;
        };
        
        const clear = () => {
            [displayCanvasRef, maskCanvasRef].forEach(canvasRef => {
                const canvas = canvasRef.current;
                if(canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                }
            });
        };

        useImperativeHandle(ref, () => ({
            getMaskAsBase64: () => {
                const canvas = maskCanvasRef.current;
                if (!canvas) return null;
                const ctx = canvas.getContext('2d');
                if(!ctx) return null;

                // Check if the canvas is empty (all black)
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const isBlank = !imageData.data.some(channel => channel !== 0);

                if (isBlank) return null; // Don't send an empty mask
                
                return canvas.toDataURL('image/png');
            },
            clearMask: clear,
        }));

        useEffect(() => {
            const maskCanvas = maskCanvasRef.current;
            if(maskCanvas) {
                const ctx = maskCanvas.getContext('2d');
                if(ctx) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
                }
            }
        }, [width, height]);

        return (
            <div 
                className="absolute inset-0 cursor-crosshair"
                onMouseDown={handleStartDrawing}
                onMouseMove={handleDrawing}
                onMouseUp={handleEndDrawing}
                onMouseLeave={handleEndDrawing}
                onTouchStart={handleStartDrawing}
                onTouchMove={handleDrawing}
                onTouchEnd={handleEndDrawing}
            >
                <canvas ref={displayCanvasRef} width={width} height={height} className="w-full h-full" />
                <canvas ref={maskCanvasRef} width={width} height={height} className="hidden" />
            </div>
        );
    }
);

// --- END of MaskingCanvas.tsx content ---


// --- Helper Components defined outside the main component ---

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
);
  
const RedoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 15 21 9m0 0-6-6M21 9H9a6 6 0 0 0 0 12h3" />
    </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const loadingMessages = [
    "Brewing a new sky...",
    "Analyzing your photo...",
    "Painting with pixels...",
    "Adjusting the lighting...",
    "Adding magical touches...",
    "Almost there..."
];

const LoadingSpinner: React.FC = () => {
    const [message, setMessage] = useState(loadingMessages[0]);
    useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                return loadingMessages[(currentIndex + 1) % loadingMessages.length];
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center rounded-xl z-30 backdrop-blur-sm transition-all">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-white">{message}</p>
        </div>
    );
}

interface AlertProps {
    message: string;
    onClose: () => void;
}
const Alert: React.FC<AlertProps> = ({ message, onClose }) => (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-600/90 text-white p-4 rounded-lg shadow-xl z-50 flex items-center gap-4 animate-fade-in">
        <span>{message}</span>
        <button onClick={onClose} className="text-2xl leading-none p-1 -mr-2 rounded-full hover:bg-red-500 transition-colors">&times;</button>
    </div>
);

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) onImageUpload(file);
    };

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isOver);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvents(e, false);
        const file = e.dataTransfer.files?.[0];
        if (file) onImageUpload(file);
    };
    
    const handlePaste = useCallback((event: ClipboardEvent) => {
        const item = event.clipboardData?.items[0];
        if (item?.type.indexOf('image') === 0) {
            const blob = item.getAsFile();
            if (blob) onImageUpload(blob as File);
        }
    }, [onImageUpload]);

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    const handleClick = () => fileInputRef.current?.click();

    return (
        <div 
            onClick={handleClick}
            onDragOver={(e) => handleDragEvents(e, true)}
            onDragLeave={(e) => handleDragEvents(e, false)}
            onDrop={handleDrop}
            className={`w-full bg-gray-800 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-[4/3] ${isDragging ? 'border-blue-500 bg-gray-700 scale-105' : 'border-gray-600 hover:border-blue-500 hover:bg-gray-700'}`}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
            <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-white">Drag & drop, paste, or click to upload</h3>
            <p className="text-gray-400 mt-1">PNG, JPG, or WEBP supported</p>
        </div>
    );
};

// --- Main Workspace Component ---

const EditorWorkspace: React.FC = () => {
    const [prompt, setPrompt] = useState(WEATHER_PRESETS[0].prompt);
    const {
        originalImage, editedImage, isLoading, error, setImageFile,
        processImage, reset, undo, redo, canUndo, canRedo, originalFile,
    } = useImageEditing();

    const [localError, setLocalError] = useState<string | null>(null);
    const [isMasking, setIsMasking] = useState(false);
    const [brushSize, setBrushSize] = useState(40);
    const [isErasing, setIsErasing] = useState(false);
    
    const maskCanvasRef = useRef<MaskingCanvasRef>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [imageContainerSize, setImageContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => { setLocalError(error); }, [error]);
    
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setImageContainerSize({ width, height });
            }
        });
        if (imageContainerRef.current) observer.observe(imageContainerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleGenerate = useCallback(async () => {
        if (!prompt) {
            setLocalError("Please enter a weather description.");
            return;
        }
        const maskData = isMasking ? maskCanvasRef.current?.getMaskAsBase64() : null;
        await processImage(prompt, maskData);
        setIsMasking(false); // Turn off masking after generating
    }, [prompt, processImage, isMasking]);

    const handleDownload = useCallback(() => {
        if (!editedImage) return;
        const link = document.createElement('a');
        link.href = editedImage;
        const name = originalFile?.name.substring(0, originalFile.name.lastIndexOf('.')) || 'image';
        const extension = originalFile?.name.substring(originalFile.name.lastIndexOf('.') + 1) || 'png';
        link.download = `${name}-weather-edit.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [editedImage, originalFile]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey) {
                if (e.key === 'z' && !e.shiftKey && canUndo) { e.preventDefault(); undo(); }
                if (e.key === 'y' || (e.key === 'z' && e.shiftKey && canRedo)) { e.preventDefault(); redo(); }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, canUndo, canRedo]);

    const handleReset = () => {
        reset();
        setIsMasking(false);
    }
    
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 animate-fade-in p-4">
            {localError && <Alert message={localError} onClose={() => setLocalError(null)} />}
            
            <div ref={imageContainerRef} className="flex-grow w-full lg:w-2/3 flex items-center justify-center relative">
                {isLoading && <LoadingSpinner />}
                
                {originalImage ? (
                     <ImageComparator before={originalImage} after={editedImage || originalImage} />
                ) : (
                    <ImageUploader onImageUpload={setImageFile} />
                )}

                {isMasking && !isLoading && imageContainerSize.width > 0 && (
                    <MaskingCanvas 
                        ref={maskCanvasRef}
                        width={imageContainerSize.width}
                        height={imageContainerSize.height}
                        brushSize={brushSize}
                        isErasing={isErasing}
                    />
                )}

                {originalImage && (
                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        <button onClick={undo} disabled={!canUndo || isLoading} className="bg-gray-800/70 text-white p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm" aria-label="Undo"><UndoIcon /></button>
                        <button onClick={redo} disabled={!canRedo || isLoading} className="bg-gray-800/70 text-white p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm" aria-label="Redo"><RedoIcon /></button>
                        <button onClick={() => setIsMasking(!isMasking)} disabled={isLoading} className={`${isMasking ? 'bg-blue-500/80' : 'bg-gray-800/70'} text-white p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm`} aria-label="Brush Mask"><BrushIcon /></button>
                        {editedImage && <button onClick={handleDownload} disabled={isLoading} className="bg-gray-800/70 text-white p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm" aria-label="Download Image"><DownloadIcon /></button>}
                    </div>
                )}
            </div>

            <div className="w-full lg:w-1/3 bg-gray-800 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
                {isMasking && (
                    <div className="bg-gray-700/50 rounded-lg p-4 animate-fade-in">
                        <h3 className="text-lg font-semibold text-white mb-3">Brush Tools</h3>
                        <div className="flex flex-col gap-4">
                             <div className="flex items-center gap-3">
                                <label htmlFor="brush-size" className="text-sm font-medium">Size</label>
                                <input id="brush-size" type="range" min="10" max="100" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => setIsErasing(false)} className={`p-2 rounded-lg flex items-center justify-center gap-2 ${!isErasing ? 'bg-blue-500/40' : 'bg-gray-600 hover:bg-gray-500'}`}><BrushIcon /> Brush</button>
                                <button onClick={() => setIsErasing(true)} className={`p-2 rounded-lg flex items-center justify-center gap-2 ${isErasing ? 'bg-blue-500/40' : 'bg-gray-600 hover:bg-gray-500'}`}><EraserIcon /> Erase</button>
                                <button onClick={() => maskCanvasRef.current?.clearMask()} className="p-2 rounded-lg bg-gray-600 hover:bg-gray-500 flex items-center justify-center gap-2"><ClearIcon /> Clear</button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-lg font-semibold text-white mb-3">Weather Presets</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                        {WEATHER_PRESETS.map((preset) => (
                            <button key={preset.name} onClick={() => setPrompt(preset.prompt)} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all text-sm font-medium border-2 ${prompt === preset.prompt ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'}`}>
                                {preset.icon}
                                <span>{preset.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="prompt-input" className="block text-lg font-semibold text-white mb-2">Or write your own description</label>
                    <textarea id="prompt-input" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., A magical night with aurora borealis" className="w-full h-24 bg-gray-900 border-2 border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none" />
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                    <button onClick={handleGenerate} disabled={isLoading || !originalImage} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                        {isLoading ? 'Generating...' : isMasking ? 'Apply Mask & Generate' : 'Generate Weather'}
                    </button>
                    
                    {originalImage && <button onClick={handleReset} disabled={isLoading} className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Upload New Photo</button>}
                </div>
            </div>
        </div>
    );
};

export default EditorWorkspace;