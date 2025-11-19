// Eyelash Try-On and Recommendation System - Frontend Version
// Uses TensorFlow.js MediaPipe Face Mesh for facial landmark detection

// ---------- CONSTANTS ----------
const LEFT_EYE_UPPER = [246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7];
const RIGHT_EYE_UPPER = [466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];

const LEFT_EYE_INNER = 133;
const LEFT_EYE_OUTER = 33;
const RIGHT_EYE_INNER = 362;
const RIGHT_EYE_OUTER = 263;

const EYELASH_NAMES = {
    "Drunk In Love": "Drunk In Love",
    "Wedding Day": "Wedding Day",
    "Foxy": "Foxy",
    "Flare": "Flare",
    "Vixen": "Vixen",
    "Other Half 1": "Other Half 1",
    "Other Half 2": "Other Half 2",
    "Staycation": "Staycation",
    "Iconic": "Iconic"
};

// ---------- EYELASH RECOMMENDATION SYSTEM ----------
class EyelashRecommendationSystem {
    constructor() {
        this.faceMeshModel = null;
        
        // Eye landmarks indices
        this.RIGHT_EYE = [33, 133, 160, 159, 158, 157, 173, 155, 154, 153, 145, 144, 163, 7];
        this.LEFT_EYE = [263, 362, 387, 386, 385, 384, 398, 382, 381, 380, 374, 373, 390, 249];
        
        // Key points for measurements
        this.RIGHT_EYE_INNER = 133;
        this.RIGHT_EYE_OUTER = 33;
        this.LEFT_EYE_INNER = 362;
        this.LEFT_EYE_OUTER = 263;
        
        // Inventory with detailed specifications
        this.inventory = {
            "Cat Eye Styles": {
                "Foxy": {
                    "suitable_sizes": ["Small", "Medium", "Large"],
                    "suitable_shapes": ["Almond", "Round", "Upturned"],
                    "style_type": "Elongating & Dramatic",
                    "description": "Perfect cat eye with outer corner emphasis",
                    "intensity": "Medium",
                    "look": "Soft Glam"
                },
                "Drunk In Love": {
                    "suitable_sizes": ["Small", "Medium"],
                    "suitable_shapes": ["Almond", "Round", "Upturned", "Downturned"],
                    "style_type": "Subtle Cat Eye",
                    "description": "Soft cat eye effect for everyday glamour",
                    "intensity": "Medium",
                    "look": "Glam"
                },
                "Other Half 2": {
                    "suitable_sizes": ["Small"],
                    "suitable_shapes": ["Almond", "Round", "Upturned", "Hooded"],
                    "style_type": "Delicate Cat Eye",
                    "description": "Lightweight cat eye for smaller eyes",
                    "intensity": "Medium",
                    "look": "Lifted"
                },
                "Vixen": {
                    "suitable_sizes": ["Large"],
                    "suitable_shapes": ["Almond", "Round", "Upturned"],
                    "style_type": "Bold Cat Eye",
                    "description": "Dramatic cat eye for larger eyes",
                    "intensity": "Heavy",
                    "look": "Dramatic"
                }
            },
            "Doll Eye Styles": {
                "Iconic": {
                    "suitable_sizes": ["Small", "Medium", "Large"],
                    "suitable_shapes": ["Round", "Almond", "Upturned", "Downturned", "Hooded"],
                    "style_type": "Universal Doll Eye",
                    "description": "Classic doll eye - works for everyone",
                    "intensity": "Medium-Heavy",
                    "look": "Versatile"
                },
                "Wedding Day": {
                    "suitable_sizes": ["Small", "Medium"],
                    "suitable_shapes": ["Round", "Almond", "Upturned", "Downturned", "Hooded"],
                    "style_type": "Romantic Doll Eye",
                    "description": "Soft, romantic doll effect",
                    "intensity": "Medium",
                    "look": "Versatile"
                },
                "Staycation": {
                    "suitable_sizes": ["Large"],
                    "suitable_shapes": ["Round", "Almond", "Upturned"],
                    "style_type": "Voluminous Doll Eye",
                    "description": "Full, dramatic doll eye for larger eyes",
                    "intensity": "Heavy",
                    "look": "Dramatic"
                }
            },
            "Natural Styles": {
                "Flare": {
                    "suitable_sizes": ["Small", "Medium"],
                    "suitable_shapes": ["Almond", "Upturned", "Downturned", "Round"],
                    "style_type": "Natural with Subtle Flare",
                    "description": "Natural look with gentle outer corner lift",
                    "intensity": "Natural",
                    "look": "Natural"
                },
                "Other Half 1": {
                    "suitable_sizes": ["Small"],
                    "suitable_shapes": ["Hooded"],
                    "style_type": "Natural for Hooded Eyes",
                    "description": "Specially designed for small hooded eyes",
                    "intensity": "Natural",
                    "look": "Natural"
                }
            }
        };
    }
    
    async loadModel() {
        if (!this.faceMeshModel) {
            this.faceMeshModel = await faceLandmarksDetection.load(
                faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
                { maxFaces: 1 }
            );
        }
        return this.faceMeshModel;
    }
    
    calculateDistance(point1, point2) {
        return Math.sqrt(
            Math.pow(point1[0] - point2[0], 2) + 
            Math.pow(point1[1] - point2[1], 2)
        );
    }
    
    getEyeMeasurements(landmarks, imgWidth, imgHeight) {
        const measurements = {};
        
        // Convert landmarks to pixel coordinates
        const rightEyeInner = [
            landmarks[this.RIGHT_EYE_INNER][0] * imgWidth,
            landmarks[this.RIGHT_EYE_INNER][1] * imgHeight
        ];
        const rightEyeOuter = [
            landmarks[this.RIGHT_EYE_OUTER][0] * imgWidth,
            landmarks[this.RIGHT_EYE_OUTER][1] * imgHeight
        ];
        const leftEyeInner = [
            landmarks[this.LEFT_EYE_INNER][0] * imgWidth,
            landmarks[this.LEFT_EYE_INNER][1] * imgHeight
        ];
        const leftEyeOuter = [
            landmarks[this.LEFT_EYE_OUTER][0] * imgWidth,
            landmarks[this.LEFT_EYE_OUTER][1] * imgHeight
        ];
        
        // Right eye measurements
        const rightEyeTop = [landmarks[159][0] * imgWidth, landmarks[159][1] * imgHeight];
        const rightEyeBottom = [landmarks[145][0] * imgWidth, landmarks[145][1] * imgHeight];
        const rightEyeTop2 = [landmarks[160][0] * imgWidth, landmarks[160][1] * imgHeight];
        const rightEyeBottom2 = [landmarks[144][0] * imgWidth, landmarks[144][1] * imgHeight];
        
        // Left eye measurements
        const leftEyeTop = [landmarks[386][0] * imgWidth, landmarks[386][1] * imgHeight];
        const leftEyeBottom = [landmarks[374][0] * imgWidth, landmarks[374][1] * imgHeight];
        const leftEyeTop2 = [landmarks[387][0] * imgWidth, landmarks[387][1] * imgHeight];
        const leftEyeBottom2 = [landmarks[373][0] * imgWidth, landmarks[373][1] * imgHeight];
        
        // Calculate absolute measurements
        const rightEyeWidth = this.calculateDistance(rightEyeInner, rightEyeOuter);
        const leftEyeWidth = this.calculateDistance(leftEyeInner, leftEyeOuter);
        
        const rightEyeHeight1 = this.calculateDistance(rightEyeTop, rightEyeBottom);
        const rightEyeHeight2 = this.calculateDistance(rightEyeTop2, rightEyeBottom2);
        const rightEyeHeight = (rightEyeHeight1 + rightEyeHeight2) / 2;
        
        const leftEyeHeight1 = this.calculateDistance(leftEyeTop, leftEyeBottom);
        const leftEyeHeight2 = this.calculateDistance(leftEyeTop2, leftEyeBottom2);
        const leftEyeHeight = (leftEyeHeight1 + leftEyeHeight2) / 2;
        
        // Inter-eye distance
        const interEyeDistance = this.calculateDistance(rightEyeInner, leftEyeInner);
        
        // Face width (for relative measurements)
        const faceLeft = [landmarks[234][0] * imgWidth, landmarks[234][1] * imgHeight];
        const faceRight = [landmarks[454][0] * imgWidth, landmarks[454][1] * imgHeight];
        const faceWidth = this.calculateDistance(faceLeft, faceRight);
        
        // Calculate RELATIVE measurements (scale-invariant)
        const avgEyeWidth = (rightEyeWidth + leftEyeWidth) / 2;
        
        measurements.right_eye_width_relative = rightEyeWidth / faceWidth;
        measurements.left_eye_width_relative = leftEyeWidth / faceWidth;
        measurements.avg_eye_width_relative = avgEyeWidth / faceWidth;
        
        // Eye Aspect Ratio (height/width) - naturally relative
        measurements.right_ear = rightEyeHeight / rightEyeWidth;
        measurements.left_ear = leftEyeHeight / leftEyeWidth;
        measurements.avg_ear = (measurements.right_ear + measurements.left_ear) / 2;
        
        // Inter-eye distance relative to eye width
        measurements.inter_eye_ratio = interEyeDistance / avgEyeWidth;
        
        // Calculate eye angles (upturned vs downturned)
        const rightAngle = Math.atan2(
            rightEyeOuter[1] - rightEyeInner[1],
            rightEyeOuter[0] - rightEyeInner[0]
        ) * (180 / Math.PI);
        
        const leftAngle = Math.atan2(
            leftEyeInner[1] - leftEyeOuter[1],
            leftEyeInner[0] - leftEyeOuter[0]
        ) * (180 / Math.PI);
        
        measurements.right_eye_angle = rightAngle;
        measurements.left_eye_angle = leftAngle;
        measurements.avg_eye_angle = (rightAngle + leftAngle) / 2;
        
        // Eyelid visibility (hooded detection)
        const rightCrease = [landmarks[157][0] * imgWidth, landmarks[157][1] * imgHeight];
        const leftCrease = [landmarks[384][0] * imgWidth, landmarks[384][1] * imgHeight];
        
        const rightLidVisibility = this.calculateDistance(rightCrease, rightEyeTop) / rightEyeHeight;
        const leftLidVisibility = this.calculateDistance(leftCrease, leftEyeTop) / leftEyeHeight;
        
        measurements.right_lid_visibility = rightLidVisibility;
        measurements.left_lid_visibility = leftLidVisibility;
        measurements.avg_lid_visibility = (rightLidVisibility + leftLidVisibility) / 2;
        
        // Symmetry score
        measurements.symmetry_score = 1 - Math.abs(rightEyeWidth - leftEyeWidth) / avgEyeWidth;
        
        return measurements;
    }
    
    classifyEyeShape(measurements) {
        const ear = measurements.avg_ear;
        const angle = measurements.avg_eye_angle;
        const lidVisibility = measurements.avg_lid_visibility;
        
        // Eye shape classification
        if (lidVisibility < 0.3) {
            return "Hooded";
        } else if (ear > 0.5) {
            return "Round";
        } else if (ear < 0.35) {
            if (angle > 2) {
                return "Upturned";
            } else if (angle < -2) {
                return "Downturned";
            } else {
                return "Almond";
            }
        } else {
            if (angle > 3) {
                return "Upturned";
            } else if (angle < -3) {
                return "Downturned";
            } else {
                return "Almond";
            }
        }
    }
    
    classifyEyeSize(measurements) {
        const eyeWidthRatio = measurements.avg_eye_width_relative;
        
        if (eyeWidthRatio < 0.15) {
            return "Small";
        } else if (eyeWidthRatio > 0.18) {
            return "Large";
        } else {
            return "Medium";
        }
    }
    
    classifyEyeSpacing(measurements) {
        const interEyeRatio = measurements.inter_eye_ratio;
        
        if (interEyeRatio < 0.95) {
            return "Close-set";
        } else if (interEyeRatio > 1.15) {
            return "Wide-set";
        } else {
            return "Average-set";
        }
    }
    
    calculateMatchScore(shape, size, spacing, productDetails) {
        let score = 100;
        
        // Perfect match for hooded eyes with specific products
        if (shape === "Hooded" && productDetails.suitable_shapes.includes("Hooded")) {
            score += 50;
        }
        
        // Prioritize universal products
        if (productDetails.suitable_sizes.length === 3) {  // Universal size
            score += 10;
        }
        if (productDetails.suitable_shapes.length >= 4) {  // Works with many shapes
            score += 10;
        }
        
        // Cat eye styles work best for elongation
        if (["Round", "Downturned"].includes(shape) && productDetails.style_type.includes("Cat Eye")) {
            score += 20;
        }
        
        // Doll eye styles work best for round enhancement
        if (["Almond", "Upturned"].includes(shape) && productDetails.style_type.includes("Doll Eye")) {
            score += 15;
        }
        
        // Natural styles for subtle looks
        if (size === "Small" && productDetails.style_type.includes("Natural")) {
            score += 15;
        }
        
        return score;
    }
    
    recommendEyelashes(shape, size, spacing) {
        const recommendedProducts = [];
        
        for (const [category, products] of Object.entries(this.inventory)) {
            for (const [productName, details] of Object.entries(products)) {
                // Check if product matches eye size and shape
                const sizeMatch = details.suitable_sizes.includes(size);
                const shapeMatch = details.suitable_shapes.includes(shape);
                
                if (sizeMatch && shapeMatch) {
                    recommendedProducts.push({
                        name: productName,
                        category: category,
                        style_type: details.style_type,
                        description: details.description,
                        intensity: details.intensity,
                        look: details.look,
                        match_score: this.calculateMatchScore(shape, size, spacing, details)
                    });
                }
            }
        }
        
        // Sort by match score
        recommendedProducts.sort((a, b) => b.match_score - a.match_score);
        
        // Get top 3 recommendations
        const topRecommendations = recommendedProducts.slice(0, 3);
        
        // Spacing-based application tips
        const spacingTips = {
            "Close-set": "Focus application on outer 2/3 of lash line to create width",
            "Wide-set": "Focus application on inner 2/3 of lash line to bring eyes closer",
            "Average-set": "Apply evenly across entire lash line for balanced look"
        };
        
        // Shape-based tips
        const shapeTips = {
            "Hooded": "Your hooded eyes look best with curled, wispy lashes that lift and open the eye. Avoid heavy styles.",
            "Round": "Elongate your beautiful round eyes with cat-eye styles that emphasize the outer corners.",
            "Almond": "Lucky you! Your almond eyes are versatile and can rock any lash style - go bold!",
            "Downturned": "Lift your eye shape with curled lashes that have extra volume at the outer corners.",
            "Upturned": "Balance your naturally lifted eyes with even length across the lash line."
        };
        
        return {
            top_picks: topRecommendations,
            all_suitable: recommendedProducts,
            application_tip: spacingTips[spacing] || "",
            shape_tip: shapeTips[shape] || "",
            total_matches: recommendedProducts.length
        };
    }
    
    async analyzeAndRecommend(imageElement) {
        await this.loadModel();
        
        const predictions = await this.faceMeshModel.estimateFaces({
            input: imageElement,
            returnTensors: false,
            flipHorizontal: false,
            predictIrises: true
        });
        
        if (!predictions || predictions.length === 0) {
            throw new Error("No face detected in image");
        }
        
        const landmarks = predictions[0].scaledMesh;
        const imgWidth = imageElement.width;
        const imgHeight = imageElement.height;
        
        // Get measurements
        const measurements = this.getEyeMeasurements(landmarks, imgWidth, imgHeight);
        
        // Classify eyes
        const eyeShape = this.classifyEyeShape(measurements);
        const eyeSize = this.classifyEyeSize(measurements);
        const eyeSpacing = this.classifyEyeSpacing(measurements);
        
        // Get recommendations
        const recommendations = this.recommendEyelashes(eyeShape, eyeSize, eyeSpacing);
        
        return {
            classification: {
                eye_shape: eyeShape,
                eye_size: eyeSize,
                eye_spacing: eyeSpacing
            },
            measurements: {
                eye_aspect_ratio: parseFloat(measurements.avg_ear.toFixed(3)),
                eye_angle: parseFloat(measurements.avg_eye_angle.toFixed(2)),
                lid_visibility: parseFloat(measurements.avg_lid_visibility.toFixed(3)),
                inter_eye_ratio: parseFloat(measurements.inter_eye_ratio.toFixed(3)),
                eye_width_to_face_ratio: parseFloat(measurements.avg_eye_width_relative.toFixed(3)),
                symmetry_score: parseFloat(measurements.symmetry_score.toFixed(3))
            },
            recommendations: recommendations
        };
    }
}

// ---------- EYELASH TRY-ON SYSTEM ----------
class EyelashTryOnSystem {
    constructor() {
        this.faceMeshModel = null;
    }
    
    async loadModel() {
        if (!this.faceMeshModel) {
            this.faceMeshModel = await faceLandmarksDetection.load(
                faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
                { maxFaces: 1 }
            );
        }
        return this.faceMeshModel;
    }
    
    rotateCanvas(canvas, angle) {
        if (angle === 0) return canvas;
        
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        const rad = angle * Math.PI / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        
        const newWidth = Math.floor(canvas.width * cos + canvas.height * sin);
        const newHeight = Math.floor(canvas.width * sin + canvas.height * cos);
        
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        
        tempCtx.translate(newWidth / 2, newHeight / 2);
        tempCtx.rotate(rad);
        tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
        
        return tempCanvas;
    }
    
    overlayTransparentImage(backgroundCanvas, overlayCanvas, x, y, width, height, rotationAngle = 0) {
        const ctx = backgroundCanvas.getContext('2d');
        
        // Create a temporary canvas for the overlay
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;
        
        // Draw resized overlay
        tempCtx.drawImage(overlayCanvas, 0, 0, width, height);
        
        // Apply rotation if specified
        let finalCanvas = tempCanvas;
        let finalX = x;
        let finalY = y;
        
        if (rotationAngle !== 0) {
            finalCanvas = this.rotateCanvas(tempCanvas, rotationAngle);
            
            // Adjust position to keep center at same location
            const newWidth = finalCanvas.width;
            const newHeight = finalCanvas.height;
            
            finalX = x - (newWidth - width) / 2;
            finalY = y - (newHeight - height) / 2;
        }
        
        // Draw on background
        ctx.drawImage(finalCanvas, finalX, finalY);
    }
    
    getEyeRegionInfo(landmarks, eyeUpperIndices, innerIdx, outerIdx, imgWidth, imgHeight) {
        const upperPoints = eyeUpperIndices.map(i => [
            landmarks[i][0] * imgWidth,
            landmarks[i][1] * imgHeight
        ]);
        
        const inner = [landmarks[innerIdx][0] * imgWidth, landmarks[innerIdx][1] * imgHeight];
        const outer = [landmarks[outerIdx][0] * imgWidth, landmarks[outerIdx][1] * imgHeight];
        
        const eyeWidth = Math.sqrt(
            Math.pow(outer[0] - inner[0], 2) + 
            Math.pow(outer[1] - inner[1], 2)
        );
        
        const centerX = (inner[0] + outer[0]) / 2;
        const centerY = upperPoints.reduce((sum, p) => sum + p[1], 0) / upperPoints.length;
        
        return {
            center_x: Math.floor(centerX),
            center_y: Math.floor(centerY),
            width: Math.floor(eyeWidth)
        };
    }
    
    async processEyelash(imageElement, eyelashImage, options = {}) {
        const {
            vertical_offset = -10,
            horizontal_offset = 0,
            size_scale = 2.0,
            height_scale = 1.0,
            rotation_angle = 0
        } = options;
        
        await this.loadModel();
        
        const predictions = await this.faceMeshModel.estimateFaces({
            input: imageElement,
            returnTensors: false,
            flipHorizontal: false,
            predictIrises: true
        });
        
        if (!predictions || predictions.length === 0) {
            throw new Error("No face detected");
        }
        
        const landmarks = predictions[0].scaledMesh;
        const imgWidth = imageElement.width;
        const imgHeight = imageElement.height;
        
        // Create output canvas
        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = imgWidth;
        outputCanvas.height = imgHeight;
        const ctx = outputCanvas.getContext('2d');
        
        // Draw original image
        ctx.drawImage(imageElement, 0, 0);
        
        // Get eye regions
        const leftInfo = this.getEyeRegionInfo(landmarks, LEFT_EYE_UPPER, LEFT_EYE_INNER, LEFT_EYE_OUTER, imgWidth, imgHeight);
        const rightInfo = this.getEyeRegionInfo(landmarks, RIGHT_EYE_UPPER, RIGHT_EYE_INNER, RIGHT_EYE_OUTER, imgWidth, imgHeight);
        
        const lashAspect = eyelashImage.width / eyelashImage.height;
        
        // LEFT EYE
        const lw = Math.floor(leftInfo.width * size_scale);
        const lh = Math.floor((lw / lashAspect) * height_scale);
        const lx = leftInfo.center_x - lw / 2 + horizontal_offset;
        const ly = leftInfo.center_y + vertical_offset - lh / 2;
        
        // RIGHT EYE (negative rotation for mirrored eye)
        const rw = Math.floor(rightInfo.width * size_scale);
        const rh = Math.floor((rw / lashAspect) * height_scale);
        const rx = rightInfo.center_x - rw / 2 - horizontal_offset;
        const ry = rightInfo.center_y + vertical_offset - rh / 2;
        
        // Create canvas for eyelash
        const eyelashCanvas = document.createElement('canvas');
        eyelashCanvas.width = eyelashImage.width;
        eyelashCanvas.height = eyelashImage.height;
        const eyelashCtx = eyelashCanvas.getContext('2d');
        eyelashCtx.drawImage(eyelashImage, 0, 0);
        
        // Create flipped version
        const flippedCanvas = document.createElement('canvas');
        flippedCanvas.width = eyelashImage.width;
        flippedCanvas.height = eyelashImage.height;
        const flippedCtx = flippedCanvas.getContext('2d');
        flippedCtx.translate(eyelashImage.width, 0);
        flippedCtx.scale(-1, 1);
        flippedCtx.drawImage(eyelashImage, 0, 0);
        
        // Apply eyelashes with rotation
        this.overlayTransparentImage(outputCanvas, eyelashCanvas, rx, ry, rw, rh, -rotation_angle);
        this.overlayTransparentImage(outputCanvas, flippedCanvas, lx, ly, lw, lh, rotation_angle);
        
        return outputCanvas;
    }
}

// ---------- UTILITY FUNCTIONS ----------
function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function loadImageFromPath(path) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = path;
    });
}

function canvasToBlob(canvas, type = 'image/jpeg', quality = 0.95) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
    });
}

// ---------- EXPORTS ----------
const recommender = new EyelashRecommendationSystem();
const tryOnSystem = new EyelashTryOnSystem();

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EyelashRecommendationSystem,
        EyelashTryOnSystem,
        recommender,
        tryOnSystem,
        loadImageFromFile,
        loadImageFromPath,
        canvasToBlob,
        EYELASH_NAMES
    };
}