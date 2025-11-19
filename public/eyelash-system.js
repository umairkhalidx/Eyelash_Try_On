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
                
                this.RIGHT_EYE = [33, 133, 160, 159, 158, 157, 173, 155, 154, 153, 145, 144, 163, 7];
                this.LEFT_EYE = [263, 362, 387, 386, 385, 384, 398, 382, 381, 380, 374, 373, 390, 249];
                
                this.RIGHT_EYE_INNER = 133;
                this.RIGHT_EYE_OUTER = 33;
                this.LEFT_EYE_INNER = 362;
                this.LEFT_EYE_OUTER = 263;
                
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
                    this.faceMeshModel = await faceLandmarksDetection.createDetector(
                        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
                        {
                            runtime: 'mediapipe',
                            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
                            maxFaces: 1
                        }
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
                
                const rightEyeInner = [
                    landmarks[this.RIGHT_EYE_INNER].x,
                    landmarks[this.RIGHT_EYE_INNER].y
                ];
                const rightEyeOuter = [
                    landmarks[this.RIGHT_EYE_OUTER].x,
                    landmarks[this.RIGHT_EYE_OUTER].y
                ];
                const leftEyeInner = [
                    landmarks[this.LEFT_EYE_INNER].x,
                    landmarks[this.LEFT_EYE_INNER].y
                ];
                const leftEyeOuter = [
                    landmarks[this.LEFT_EYE_OUTER].x,
                    landmarks[this.LEFT_EYE_OUTER].y
                ];
                
                const rightEyeTop = [landmarks[159].x, landmarks[159].y];
                const rightEyeBottom = [landmarks[145].x, landmarks[145].y];
                const rightEyeTop2 = [landmarks[160].x, landmarks[160].y];
                const rightEyeBottom2 = [landmarks[144].x, landmarks[144].y];
                
                const leftEyeTop = [landmarks[386].x, landmarks[386].y];
                const leftEyeBottom = [landmarks[374].x, landmarks[374].y];
                const leftEyeTop2 = [landmarks[387].x, landmarks[387].y];
                const leftEyeBottom2 = [landmarks[373].x, landmarks[373].y];
                
                const rightEyeWidth = this.calculateDistance(rightEyeInner, rightEyeOuter);
                const leftEyeWidth = this.calculateDistance(leftEyeInner, leftEyeOuter);
                
                const rightEyeHeight1 = this.calculateDistance(rightEyeTop, rightEyeBottom);
                const rightEyeHeight2 = this.calculateDistance(rightEyeTop2, rightEyeBottom2);
                const rightEyeHeight = (rightEyeHeight1 + rightEyeHeight2) / 2;
                
                const leftEyeHeight1 = this.calculateDistance(leftEyeTop, leftEyeBottom);
                const leftEyeHeight2 = this.calculateDistance(leftEyeTop2, leftEyeBottom2);
                const leftEyeHeight = (leftEyeHeight1 + leftEyeHeight2) / 2;
                
                const interEyeDistance = this.calculateDistance(rightEyeInner, leftEyeInner);
                
                const faceLeft = [landmarks[234].x, landmarks[234].y];
                const faceRight = [landmarks[454].x, landmarks[454].y];
                const faceWidth = this.calculateDistance(faceLeft, faceRight);
                
                const avgEyeWidth = (rightEyeWidth + leftEyeWidth) / 2;
                
                measurements.right_eye_width_relative = rightEyeWidth / faceWidth;
                measurements.left_eye_width_relative = leftEyeWidth / faceWidth;
                measurements.avg_eye_width_relative = avgEyeWidth / faceWidth;
                
                measurements.right_ear = rightEyeHeight / rightEyeWidth;
                measurements.left_ear = leftEyeHeight / leftEyeWidth;
                measurements.avg_ear = (measurements.right_ear + measurements.left_ear) / 2;
                
                measurements.inter_eye_ratio = interEyeDistance / avgEyeWidth;
                
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
                
                const rightCrease = [landmarks[157].x, landmarks[157].y];
                const leftCrease = [landmarks[384].x, landmarks[384].y];
                
                const rightLidVisibility = this.calculateDistance(rightCrease, rightEyeTop) / rightEyeHeight;
                const leftLidVisibility = this.calculateDistance(leftCrease, leftEyeTop) / leftEyeHeight;
                
                measurements.right_lid_visibility = rightLidVisibility;
                measurements.left_lid_visibility = leftLidVisibility;
                measurements.avg_lid_visibility = (rightLidVisibility + leftLidVisibility) / 2;
                
                measurements.symmetry_score = 1 - Math.abs(rightEyeWidth - leftEyeWidth) / avgEyeWidth;
                
                return measurements;
            }
            
            classifyEyeShape(measurements) {
                const ear = measurements.avg_ear;
                const angle = measurements.avg_eye_angle;
                const lidVisibility = measurements.avg_lid_visibility;
                
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
                
                if (shape === "Hooded" && productDetails.suitable_shapes.includes("Hooded")) {
                    score += 50;
                }
                
                if (productDetails.suitable_sizes.length === 3) {
                    score += 10;
                }
                if (productDetails.suitable_shapes.length >= 4) {
                    score += 10;
                }
                
                if (["Round", "Downturned"].includes(shape) && productDetails.style_type.includes("Cat Eye")) {
                    score += 20;
                }
                
                if (["Almond", "Upturned"].includes(shape) && productDetails.style_type.includes("Doll Eye")) {
                    score += 15;
                }
                
                if (size === "Small" && productDetails.style_type.includes("Natural")) {
                    score += 15;
                }
                
                return score;
            }
            
            recommendEyelashes(shape, size, spacing) {
                const recommendedProducts = [];
                
                for (const [category, products] of Object.entries(this.inventory)) {
                    for (const [productName, details] of Object.entries(products)) {
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
                
                recommendedProducts.sort((a, b) => b.match_score - a.match_score);
                
                const topRecommendations = recommendedProducts.slice(0, 3);
                
                const spacingTips = {
                    "Close-set": "Focus application on outer 2/3 of lash line to create width",
                    "Wide-set": "Focus application on inner 2/3 of lash line to bring eyes closer",
                    "Average-set": "Apply evenly across entire lash line for balanced look"
                };
                
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
                
                const predictions = await this.faceMeshModel.estimateFaces(imageElement);
                
                if (!predictions || predictions.length === 0) {
                    throw new Error("No face detected in image");
                }
                
                const landmarks = predictions[0].keypoints;
                const imgWidth = imageElement.width;
                const imgHeight = imageElement.height;
                
                const measurements = this.getEyeMeasurements(landmarks, imgWidth, imgHeight);
                
                const eyeShape = this.classifyEyeShape(measurements);
                const eyeSize = this.classifyEyeSize(measurements);
                const eyeSpacing = this.classifyEyeSpacing(measurements);
                
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
                    this.faceMeshModel = await faceLandmarksDetection.createDetector(
                        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
                        {
                            runtime: 'mediapipe',
                            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
                            maxFaces: 1
                        }
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
                
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = width;
                tempCanvas.height = height;
                
                tempCtx.drawImage(overlayCanvas, 0, 0, width, height);
                
                let finalCanvas = tempCanvas;
                let finalX = x;
                let finalY = y;
                
                if (rotationAngle !== 0) {
                    finalCanvas = this.rotateCanvas(tempCanvas, rotationAngle);
                    
                    const newWidth = finalCanvas.width;
                    const newHeight = finalCanvas.height;
                    
                    finalX = x - (newWidth - width) / 2;
                    finalY = y - (newHeight - height) / 2;
                }
                
                ctx.drawImage(finalCanvas, finalX, finalY);
            }
            
            getEyeRegionInfo(landmarks, eyeUpperIndices, innerIdx, outerIdx, imgWidth, imgHeight) {
                const upperPoints = eyeUpperIndices.map(i => [
                    landmarks[i].x,
                    landmarks[i].y
                ]);
                
                const inner = [landmarks[innerIdx].x, landmarks[innerIdx].y];
                const outer = [landmarks[outerIdx].x, landmarks[outerIdx].y];
                
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
                
                const predictions = await this.faceMeshModel.estimateFaces(imageElement);
                
                if (!predictions || predictions.length === 0) {
                    throw new Error("No face detected");
                }
                
                const landmarks = predictions[0].keypoints;
                const imgWidth = imageElement.width;
                const imgHeight = imageElement.height;
                
                const outputCanvas = document.createElement('canvas');
                outputCanvas.width = imgWidth;
                outputCanvas.height = imgHeight;
                const ctx = outputCanvas.getContext('2d');
                
                ctx.drawImage(imageElement, 0, 0);
                
                const leftInfo = this.getEyeRegionInfo(landmarks, LEFT_EYE_UPPER, LEFT_EYE_INNER, LEFT_EYE_OUTER, imgWidth, imgHeight);
                const rightInfo = this.getEyeRegionInfo(landmarks, RIGHT_EYE_UPPER, RIGHT_EYE_INNER, RIGHT_EYE_OUTER, imgWidth, imgHeight);
                
                const lashAspect = eyelashImage.width / eyelashImage.height;
                
                const lw = Math.floor(leftInfo.width * size_scale);
                const lh = Math.floor((lw / lashAspect) * height_scale);
                const lx = leftInfo.center_x - lw / 2 + horizontal_offset;
                const ly = leftInfo.center_y + vertical_offset - lh / 2;
                
                const rw = Math.floor(rightInfo.width * size_scale);
                const rh = Math.floor((rw / lashAspect) * height_scale);
                const rx = rightInfo.center_x - rw / 2 - horizontal_offset;
                const ry = rightInfo.center_y + vertical_offset - rh / 2;
                
                const eyelashCanvas = document.createElement('canvas');
                eyelashCanvas.width = eyelashImage.width;
                eyelashCanvas.height = eyelashImage.height;
                const eyelashCtx = eyelashCanvas.getContext('2d');
                eyelashCtx.drawImage(eyelashImage, 0, 0);
                
                const flippedCanvas = document.createElement('canvas');
                flippedCanvas.width = eyelashImage.width;
                flippedCanvas.height = eyelashImage.height;
                const flippedCtx = flippedCanvas.getContext('2d');
                flippedCtx.translate(eyelashImage.width, 0);
                flippedCtx.scale(-1, 1);
                flippedCtx.drawImage(eyelashImage, 0, 0);
                
                this.overlayTransparentImage(outputCanvas, eyelashCanvas, rx, ry, rw, rh, -rotation_angle);
                this.overlayTransparentImage(outputCanvas, flippedCanvas, lx, ly, lw, lh, rotation_angle);
                
                return outputCanvas;
            }
        }

        // ---------- APPLICATION STATE ----------
        const recommender = new EyelashRecommendationSystem();
        const tryOnSystem = new EyelashTryOnSystem();
        
        let currentImage = null;
        let selectedEyelash = null;
        let stream = null;
        let eyelashImages = {};
        
        // ---------- UI ELEMENTS ----------
        const fileUpload = document.getElementById('fileUpload');
        const startCamera = document.getElementById('startCamera');
        const stopCamera = document.getElementById('stopCamera');
        const capturePhoto = document.getElementById('capturePhoto');
        const video = document.getElementById('video');
        const videoWrapper = document.getElementById('videoWrapper');
        const imagePreview = document.getElementById('imagePreview');
        const resultCanvas = document.getElementById('resultCanvas');
        const uploadPrompt = document.getElementById('uploadPrompt');
        const tryOnBtn = document.getElementById('tryOnBtn');
        const recommendBtn = document.getElementById('recommendBtn');
        const resetBtn = document.getElementById('resetBtn');
        const applyAdjustments = document.getElementById('applyAdjustments');
        const loadingOverlay = document.getElementById('loadingOverlay');
        const eyelashGrid = document.getElementById('eyelashGrid');
        const cameraStatus = document.getElementById('cameraStatus');
        const recommendationsSection = document.getElementById('recommendationsSection');
        
        // Control elements
        const verticalOffset = document.getElementById('verticalOffset');
        const horizontalOffset = document.getElementById('horizontalOffset');
        const sizeScale = document.getElementById('sizeScale');
        const heightScale = document.getElementById('heightScale');
        const rotationAngle = document.getElementById('rotationAngle');
        const resetControls = document.getElementById('resetControls');
        
        // Value displays
        const verticalValue = document.getElementById('verticalValue');
        const horizontalValue = document.getElementById('horizontalValue');
        const sizeValue = document.getElementById('sizeValue');
        const heightValue = document.getElementById('heightValue');
        const rotationValue = document.getElementById('rotationValue');
        
        // ---------- INITIALIZE ----------
        function initializeEyelashGrid() {
            eyelashGrid.innerHTML = '';
            Object.keys(EYELASH_NAMES).forEach(name => {
                const option = document.createElement('div');
                option.className = 'eyelash-option';
                option.innerHTML = `<h4>${name}</h4>`;
                option.onclick = () => selectEyelash(name, option);
                eyelashGrid.appendChild(option);
            });
        }
        
        function selectEyelash(name, element) {
            document.querySelectorAll('.eyelash-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            element.classList.add('selected');
            selectedEyelash = name;
            
            if (currentImage) {
                tryOnBtn.disabled = false;
                applyAdjustments.disabled = false;
            }
        }
        
        // ---------- CONTROL SLIDERS ----------
        verticalOffset.oninput = () => verticalValue.textContent = verticalOffset.value;
        horizontalOffset.oninput = () => horizontalValue.textContent = horizontalOffset.value;
        sizeScale.oninput = () => sizeValue.textContent = parseFloat(sizeScale.value).toFixed(1);
        heightScale.oninput = () => heightValue.textContent = parseFloat(heightScale.value).toFixed(1);
        rotationAngle.oninput = () => rotationValue.textContent = rotationAngle.value + '°';
        
        resetControls.onclick = () => {
            verticalOffset.value = -10;
            horizontalOffset.value = 0;
            sizeScale.value = 2.0;
            heightScale.value = 1.0;
            rotationAngle.value = 0;
            
            verticalValue.textContent = '-10';
            horizontalValue.textContent = '0';
            sizeValue.textContent = '2.0';
            heightValue.textContent = '1.0';
            rotationValue.textContent = '0°';
        };
        
        // ---------- FILE UPLOAD ----------
        fileUpload.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    currentImage = img;
                    displayImage(img);
                    enableButtons();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };
        
        // ---------- CAMERA ----------
        startCamera.onclick = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user' } 
                });
                video.srcObject = stream;
                video.classList.add('active');
                videoWrapper.style.display = 'block';
                uploadPrompt.style.display = 'none';
                imagePreview.classList.remove('active');
                resultCanvas.style.display = 'none';
                
                startCamera.style.display = 'none';
                capturePhoto.style.display = 'block';
                stopCamera.style.display = 'block';
                cameraStatus.style.display = 'block';
                
                tryOnBtn.disabled = true;
                recommendBtn.disabled = true;
                applyAdjustments.disabled = true;
            } catch (err) {
                alert('Could not access camera: ' + err.message);
            }
        };
        
        capturePhoto.onclick = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                stopCameraStream();
                displayImage(img);
                enableButtons();
            };
            img.src = canvas.toDataURL('image/jpeg');
        };
        
        stopCamera.onclick = stopCameraStream;
        
        function stopCameraStream() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
            video.classList.remove('active');
            videoWrapper.style.display = 'none';
            startCamera.style.display = 'block';
            capturePhoto.style.display = 'none';
            stopCamera.style.display = 'none';
            cameraStatus.style.display = 'none';
        }
        
        // ---------- DISPLAY FUNCTIONS ----------
        function displayImage(img) {
            imagePreview.src = img.src;
            imagePreview.classList.add('active');
            uploadPrompt.style.display = 'none';
            resultCanvas.style.display = 'none';
            resetBtn.style.display = 'inline-block';
        }
        
        function displayResult(canvas) {
            resultCanvas.width = canvas.width;
            resultCanvas.height = canvas.height;
            const ctx = resultCanvas.getContext('2d');
            ctx.drawImage(canvas, 0, 0);
            
            imagePreview.classList.remove('active');
            resultCanvas.style.display = 'block';
        }
        
        function enableButtons() {
            recommendBtn.disabled = false;
            if (selectedEyelash) {
                tryOnBtn.disabled = false;
                applyAdjustments.disabled = false;
            }
        }
        
        // ---------- TRY ON ----------
        tryOnBtn.onclick = async () => {
            if (!currentImage || !selectedEyelash) return;
            
            loadingOverlay.classList.add('active');
            
            try {
                const eyelashImg = await loadEyelashImage(selectedEyelash);
                
                const options = {
                    vertical_offset: parseInt(verticalOffset.value),
                    horizontal_offset: parseInt(horizontalOffset.value),
                    size_scale: parseFloat(sizeScale.value),
                    height_scale: parseFloat(heightScale.value),
                    rotation_angle: parseFloat(rotationAngle.value)
                };
                
                const resultCan = await tryOnSystem.processEyelash(currentImage, eyelashImg, options);
                displayResult(resultCan);
                
            } catch (err) {
                alert('Error: ' + err.message);
            } finally {
                loadingOverlay.classList.remove('active');
            }
        };
        
        applyAdjustments.onclick = tryOnBtn.onclick;
        
        // ---------- RECOMMENDATIONS ----------
        recommendBtn.onclick = async () => {
            if (!currentImage) return;
            
            loadingOverlay.classList.add('active');
            
            try {
                const result = await recommender.analyzeAndRecommend(currentImage);
                displayRecommendations(result);
            } catch (err) {
                alert('Error: ' + err.message);
            } finally {
                loadingOverlay.classList.remove('active');
            }
        };
        
        function displayRecommendations(result) {
            const { classification, measurements, recommendations } = result;
            
            const classificationInfo = document.getElementById('classificationInfo');
            classificationInfo.innerHTML = `
                <h4>Your Eye Characteristics</h4>
                <div class="info-row">
                    <span class="info-label">Eye Shape:</span>
                    <span class="info-value">${classification.eye_shape}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Eye Size:</span>
                    <span class="info-value">${classification.eye_size}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Eye Spacing:</span>
                    <span class="info-value">${classification.eye_spacing}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Symmetry Score:</span>
                    <span class="info-value">${(measurements.symmetry_score * 100).toFixed(0)}%</span>
                </div>
            `;
            
            const recommendationsContainer = document.getElementById('recommendationsContainer');
            recommendationsContainer.innerHTML = '';
            
            if (recommendations.shape_tip) {
                const tipCard = document.createElement('div');
                tipCard.className = 'alert alert-info';
                tipCard.innerHTML = `<strong>💡 Tip:</strong> ${recommendations.shape_tip}`;
                recommendationsContainer.appendChild(tipCard);
            }
            
            if (recommendations.application_tip) {
                const appCard = document.createElement('div');
                appCard.className = 'alert alert-success';
                appCard.innerHTML = `<strong>✨ Application:</strong> ${recommendations.application_tip}`;
                recommendationsContainer.appendChild(appCard);
            }
            
            recommendations.top_picks.forEach((product, index) => {
                const card = document.createElement('div');
                card.className = 'recommendation-card';
                card.innerHTML = `
                    <h4>#${index + 1} ${product.name}</h4>
                    <p><strong>${product.style_type}</strong></p>
                    <p>${product.description}</p>
                    <div>
                        <span class="badge badge-primary">${product.category}</span>
                        <span class="badge badge-success">${product.intensity}</span>
                        <span class="badge badge-info">${product.look}</span>
                    </div>
                `;
                card.onclick = () => {
                    const options = Array.from(document.querySelectorAll('.eyelash-option'));
                    const option = options.find(opt => opt.textContent.trim() === product.name);
                    if (option) {
                        selectEyelash(product.name, option);
                        option.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                };
                card.style.cursor = 'pointer';
                recommendationsContainer.appendChild(card);
            });
            
            recommendationsSection.style.display = 'block';
        }
        
        // ---------- RESET ----------
        resetBtn.onclick = () => {
            currentImage = null;
            selectedEyelash = null;
            imagePreview.classList.remove('active');
            resultCanvas.style.display = 'none';
            uploadPrompt.style.display = 'block';
            resetBtn.style.display = 'none';
            tryOnBtn.disabled = true;
            recommendBtn.disabled = true;
            applyAdjustments.disabled = true;
            recommendationsSection.style.display = 'none';
            
            document.querySelectorAll('.eyelash-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            fileUpload.value = '';
        };
        
        // ---------- EYELASH IMAGE LOADER ----------
        async function loadEyelashImage(name) {
            if (eyelashImages[name]) {
                return eyelashImages[name];
            }
            
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    eyelashImages[name] = img;
                    resolve(img);
                };
                img.onerror = () => reject(new Error(`Could not load eyelash image: ${name}`));
                img.src = `eyelashes/${name}.png`;
            });
        }
        
        // ---------- INITIALIZE APP ----------
        initializeEyelashGrid();