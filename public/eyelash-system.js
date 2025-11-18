// eyelash-system.js

// ---------- EYELASH DETECTION SETUP ----------
const LEFT_EYE_UPPER = [246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7];
const RIGHT_EYE_UPPER = [466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];

const LEFT_EYE_INNER = 133;
const LEFT_EYE_OUTER = 33;
const RIGHT_EYE_INNER = 362;
const RIGHT_EYE_OUTER = 263;

// ---------- EYELASH NAME MAPPING ----------
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
    
    calculateDistance(point1, point2) {
        return Math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2);
    }
    
    getEyeMeasurements(landmarks, imgWidth, imgHeight) {
        const measurements = {};
        
        // Convert landmarks to pixel coordinates
        const rightEyeInner = [
            landmarks[this.RIGHT_EYE_INNER].x * imgWidth,
            landmarks[this.RIGHT_EYE_INNER].y * imgHeight
        ];
        const rightEyeOuter = [
            landmarks[this.RIGHT_EYE_OUTER].x * imgWidth,
            landmarks[this.RIGHT_EYE_OUTER].y * imgHeight
        ];
        const leftEyeInner = [
            landmarks[this.LEFT_EYE_INNER].x * imgWidth,
            landmarks[this.LEFT_EYE_INNER].y * imgHeight
        ];
        const leftEyeOuter = [
            landmarks[this.LEFT_EYE_OUTER].x * imgWidth,
            landmarks[this.LEFT_EYE_OUTER].y * imgHeight
        ];
        
        // Right eye measurements
        const rightEyeTop = [landmarks[159].x * imgWidth, landmarks[159].y * imgHeight];
        const rightEyeBottom = [landmarks[145].x * imgWidth, landmarks[145].y * imgHeight];
        const rightEyeTop2 = [landmarks[160].x * imgWidth, landmarks[160].y * imgHeight];
        const rightEyeBottom2 = [landmarks[144].x * imgWidth, landmarks[144].y * imgHeight];
        
        // Left eye measurements
        const leftEyeTop = [landmarks[386].x * imgWidth, landmarks[386].y * imgHeight];
        const leftEyeBottom = [landmarks[374].x * imgWidth, landmarks[374].y * imgHeight];
        const leftEyeTop2 = [landmarks[387].x * imgWidth, landmarks[387].y * imgHeight];
        const leftEyeBottom2 = [landmarks[373].x * imgWidth, landmarks[373].y * imgHeight];
        
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
        const faceLeft = [landmarks[234].x * imgWidth, landmarks[234].y * imgHeight];
        const faceRight = [landmarks[454].x * imgWidth, landmarks[454].y * imgHeight];
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
        const rightCrease = [landmarks[157].x * imgWidth, landmarks[157].y * imgHeight];
        const leftCrease = [landmarks[384].x * imgWidth, landmarks[384].y * imgHeight];
        
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
        if (productDetails.suitable_sizes.length === 3) { // Universal size
            score += 10;
        }
        if (productDetails.suitable_shapes.length >= 4) { // Works with many shapes
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
        // Find matching products
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
        const topRecommendations = recommendedProducts.length >= 3 ? 
            recommendedProducts.slice(0, 3) : recommendedProducts;
        
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
        return new Promise((resolve, reject) => {
            // Create canvas for image processing
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            ctx.drawImage(imageElement, 0, 0);
            
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            
            // Initialize MediaPipe Face Mesh
            const faceMesh = new FaceMesh({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
                }
            });
            
            faceMesh.setOptions({
                staticImageMode: true,
                maxNumFaces: 1,
                refineLandmarks: true,
                minDetectionConfidence: 0.5
            });
            
            faceMesh.onResults((results) => {
                if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
                    reject(new Error("No face detected in image"));
                    return;
                }
                
                const landmarks = results.multiFaceLandmarks[0];
                
                // Get measurements
                const measurements = this.getEyeMeasurements(landmarks, imgWidth, imgHeight);
                
                // Classify eyes
                const eyeShape = this.classifyEyeShape(measurements);
                const eyeSize = this.classifyEyeSize(measurements);
                const eyeSpacing = this.classifyEyeSpacing(measurements);
                
                // Get recommendations
                const recommendations = this.recommendEyelashes(eyeShape, eyeSize, eyeSpacing);
                
                // Compile results
                resolve({
                    classification: {
                        eye_shape: eyeShape,
                        eye_size: eyeSize,
                        eye_spacing: eyeSpacing
                    },
                    measurements: {
                        eye_aspect_ratio: Math.round(measurements.avg_ear * 1000) / 1000,
                        eye_angle: Math.round(measurements.avg_eye_angle * 100) / 100,
                        lid_visibility: Math.round(measurements.avg_lid_visibility * 1000) / 1000,
                        inter_eye_ratio: Math.round(measurements.inter_eye_ratio * 1000) / 1000,
                        eye_width_to_face_ratio: Math.round(measurements.avg_eye_width_relative * 1000) / 1000,
                        symmetry_score: Math.round(measurements.symmetry_score * 1000) / 1000
                    },
                    recommendations: recommendations
                });
            });
            
            // Process the image
            faceMesh.send({ image: canvas });
        });
    }
}

// Initialize the recommender globally
const recommender = new EyelashRecommendationSystem();

// ---------- HELPER FUNCTIONS FOR TRY-ON ----------
function rotateImage(image, angle) {
    if (angle === 0) {
        return image;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const width = image.width;
    const height = image.height;
    
    // Set canvas size to accommodate rotation
    const radians = angle * Math.PI / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    const newWidth = Math.floor(width * cos + height * sin);
    const newHeight = Math.floor(height * cos + width * sin);
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    // Translate to center and rotate
    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.rotate(radians);
    ctx.drawImage(image, -width / 2, -height / 2);
    
    return canvas;
}

function overlayTransparentImage(background, overlayImg, x, y, width, height, rotationAngle = 0) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = background.width;
    canvas.height = background.height;
    
    // Draw background
    ctx.drawImage(background, 0, 0);
    
    // Prepare overlay
    let overlayCanvas = document.createElement('canvas');
    let overlayCtx = overlayCanvas.getContext('2d');
    
    overlayCanvas.width = width;
    overlayCanvas.height = height;
    overlayCtx.drawImage(overlayImg, 0, 0, width, height);
    
    // Apply rotation if specified
    if (rotationAngle !== 0) {
        overlayCanvas = rotateImage(overlayCanvas, rotationAngle);
        
        // Adjust position to keep center at same location
        x = x - (overlayCanvas.width - width) / 2;
        y = y - (overlayCanvas.height - height) / 2;
        
        // Update dimensions
        width = overlayCanvas.width;
        height = overlayCanvas.height;
    }
    
    // Draw overlay with transparency
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(overlayCanvas, x, y, width, height);
    
    return canvas;
}

function getEyeRegionInfo(landmarks, eyeUpperIndices, innerIdx, outerIdx, imgWidth, imgHeight) {
    const upperPoints = eyeUpperIndices.map(i => ({
        x: landmarks[i].x * imgWidth,
        y: landmarks[i].y * imgHeight
    }));
    
    const inner = {
        x: landmarks[innerIdx].x * imgWidth,
        y: landmarks[innerIdx].y * imgHeight
    };
    
    const outer = {
        x: landmarks[outerIdx].x * imgWidth,
        y: landmarks[outerIdx].y * imgHeight
    };
    
    const eyeWidth = Math.sqrt((outer.x - inner.x) ** 2 + (outer.y - inner.y) ** 2);
    const centerX = (inner.x + outer.x) / 2;
    const centerY = upperPoints.reduce((sum, point) => sum + point.y, 0) / upperPoints.length;
    
    return {
        centerX: Math.round(centerX),
        centerY: Math.round(centerY),
        width: Math.round(eyeWidth)
    };
}

async function processEyelash(imageElement, eyelashImg, verticalOffset = -10, horizontalOffset = 0, 
                           sizeScale = 2.0, heightScale = 1.0, rotationAngle = 0) {
    return new Promise((resolve, reject) => {
        // Create canvas for processing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        ctx.drawImage(imageElement, 0, 0);
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Initialize MediaPipe Face Mesh
        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });
        
        faceMesh.setOptions({
            staticImageMode: true,
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5
        });
        
        faceMesh.onResults((results) => {
            if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
                reject(new Error("No face detected"));
                return;
            }
            
            const landmarks = results.multiFaceLandmarks[0];
            
            const leftInfo = getEyeRegionInfo(landmarks, LEFT_EYE_UPPER, LEFT_EYE_INNER, LEFT_EYE_OUTER, imgWidth, imgHeight);
            const rightInfo = getEyeRegionInfo(landmarks, RIGHT_EYE_UPPER, RIGHT_EYE_INNER, RIGHT_EYE_OUTER, imgWidth, imgHeight);
            
            const lashAspect = eyelashImg.width / eyelashImg.height;
            
            // Apply adjustments
            // LEFT EYE
            const lw = Math.round(leftInfo.width * sizeScale);
            const lh = Math.round((lw / lashAspect) * heightScale);
            const lx = leftInfo.centerX - Math.round(lw / 2) + horizontalOffset;
            const ly = leftInfo.centerY + verticalOffset - Math.round(lh / 2);
            
            // RIGHT EYE (negative rotation for mirrored eye)
            const rw = Math.round(rightInfo.width * sizeScale);
            const rh = Math.round((rw / lashAspect) * heightScale);
            const rx = rightInfo.centerX - Math.round(rw / 2) - horizontalOffset;
            const ry = rightInfo.centerY + verticalOffset - Math.round(rh / 2);
            
            // Apply eyelashes with rotation
            let resultCanvas = overlayTransparentImage(canvas, eyelashImg, rx, ry, rw, rh, -rotationAngle);
            
            // Flip for left eye
            const flippedCanvas = document.createElement('canvas');
            const flippedCtx = flippedCanvas.getContext('2d');
            flippedCanvas.width = eyelashImg.width;
            flippedCanvas.height = eyelashImg.height;
            flippedCtx.scale(-1, 1);
            flippedCtx.drawImage(eyelashImg, -eyelashImg.width, 0);
            
            resultCanvas = overlayTransparentImage(resultCanvas, flippedCanvas, lx, ly, lw, lh, rotationAngle);
            
            resolve(resultCanvas.toDataURL('image/jpeg'));
        });
        
        // Process the image
        faceMesh.send({ image: canvas });
    });
}

// ---------- API FUNCTIONS ----------
class EyelashAPI {
    static getDefaultSettings() {
        return {
            default_settings: {
                vertical_offset: -10,
                horizontal_offset: 0,
                size_scale: 2.0,
                height_scale: 1.0,
                rotation_angle: 0
            },
            valid_ranges: {
                vertical_offset: { min: -50, max: 50 },
                horizontal_offset: { min: -50, max: 50 },
                size_scale: { min: 0.5, max: 3.0 },
                height_scale: { min: 0.5, max: 2.0 },
                rotation_angle: { min: -45, max: 45 }
            }
        };
    }
    
    static getEyelashes() {
        const eyelashesInfo = [];
        
        for (const [category, products] of Object.entries(recommender.inventory)) {
            for (const [name, details] of Object.entries(products)) {
                eyelashesInfo.push({
                    name: name,
                    category: category,
                    style: details.style_type,
                    intensity: details.intensity,
                    look: details.look,
                    description: details.description,
                    suitable_sizes: details.suitable_sizes,
                    suitable_shapes: details.suitable_shapes
                });
            }
        }
        
        return {
            success: true,
            total: eyelashesInfo.length,
            eyelashes: eyelashesInfo
        };
    }
    
    static validateAdjustmentParams(params) {
        const { vertical_offset, horizontal_offset, size_scale, height_scale, rotation_angle } = params;
        
        if (vertical_offset < -50 || vertical_offset > 50) {
            throw new Error("Vertical offset must be between -50 and 50");
        }
        if (horizontal_offset < -50 || horizontal_offset > 50) {
            throw new Error("Horizontal offset must be between -50 and 50");
        }
        if (size_scale < 0.5 || size_scale > 3.0) {
            throw new Error("Size scale must be between 0.5 and 3.0");
        }
        if (height_scale < 0.5 || height_scale > 2.0) {
            throw new Error("Height scale must be between 0.5 and 2.0");
        }
        if (rotation_angle < -45 || rotation_angle > 45) {
            throw new Error("Rotation angle must be between -45 and 45 degrees");
        }
    }
}

// Export for use in HTML
window.EyelashSystem = {
    EyelashRecommendationSystem: recommender,
    processEyelash,
    EyelashAPI,
    EYELASH_NAMES
};