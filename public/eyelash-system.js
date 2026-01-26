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

        // New inventory structure based on eye shape and size combinations
        this.recommendations = {
            "Almond": {
                "Small": [
                    {
                        name: "Other Half 1",
                        description: "Soft, natural half-lash with gentle cat-eye lift",
                        style_type: "Natural Half-Lash",
                        intensity: "Natural",
                        look: "Subtle Lift",
                        priority: 1
                    },
                    {
                        name: "Iconic",
                        description: "Universal slight cat/doll, medium–heavy but still balanced",
                        style_type: "Cat-Doll Hybrid",
                        intensity: "Medium-Heavy",
                        look: "Versatile Glam",
                        priority: 2
                    },
                    {
                        name: "Drunk in Love",
                        description: "Proper cat-eye glam, great when they want more drama",
                        style_type: "Cat Eye",
                        intensity: "Medium",
                        look: "Dramatic Glam",
                        priority: 3
                    }
                ],
                "Medium": [
                    {
                        name: "Wedding Day",
                        description: "Medium doll-eye, universal, soft but defined",
                        style_type: "Doll Eye",
                        intensity: "Medium",
                        look: "Romantic",
                        priority: 1
                    },
                    {
                        name: "Iconic",
                        description: "Wispy, medium–heavy, glam but versatile",
                        style_type: "Wispy Glam",
                        intensity: "Medium-Heavy",
                        look: "Versatile",
                        priority: 2
                    },
                    {
                        name: "Foxy",
                        description: "Soft cat-eye, super wispy, flattering for medium eyes",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Soft Glam",
                        priority: 3
                    }
                ],
                "Large": [
                    {
                        name: "Wedding Day",
                        description: "Soft option that doesn't overwhelm large eyes",
                        style_type: "Soft Doll Eye",
                        intensity: "Medium",
                        look: "Elegant",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Wispy cat-eye that frames large eyes beautifully",
                        style_type: "Wispy Cat Eye",
                        intensity: "Medium",
                        look: "Framing",
                        priority: 2
                    },
                    {
                        name: "Vixen",
                        description: "Heavy cat-eye for full-on drama on big almond eyes",
                        style_type: "Bold Cat Eye",
                        intensity: "Heavy",
                        look: "Full Drama",
                        priority: 3
                    }
                ]
            },
            "Round": {
                "Small": [
                    {
                        name: "Other Half 1",
                        description: "Soft half-lash, adds length at outer corner without closing the eye",
                        style_type: "Natural Half-Lash",
                        intensity: "Natural",
                        look: "Subtle Length",
                        priority: 1
                    },
                    {
                        name: "Other Half 2",
                        description: "Cat-eye half-lash, elongates and lifts outer corner",
                        style_type: "Cat-Eye Half-Lash",
                        intensity: "Medium",
                        look: "Lifted",
                        priority: 2
                    },
                    {
                        name: "Drunk in Love",
                        description: "Full cat-eye for a stronger elongating effect",
                        style_type: "Cat Eye",
                        intensity: "Medium",
                        look: "Elongating",
                        priority: 3
                    }
                ],
                "Medium": [
                    {
                        name: "Wedding Day",
                        description: "Soft doll-eye, opens the eye without making it too round",
                        style_type: "Soft Doll Eye",
                        intensity: "Medium",
                        look: "Opening",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Soft cat-eye, elongates and balances roundness",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Balancing",
                        priority: 2
                    },
                    {
                        name: "Iconic",
                        description: "Slight cat-eye, wispy glam for more intensity",
                        style_type: "Wispy Cat-Glam",
                        intensity: "Medium-Heavy",
                        look: "Intense Glam",
                        priority: 3
                    }
                ],
                "Large": [
                    {
                        name: "Foxy",
                        description: "Soft cat-eye to elongate and frame large round eyes",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Elongating Frame",
                        priority: 1
                    },
                    {
                        name: "Vixen",
                        description: "Heavy cat-eye for strong outer-corner elongation",
                        style_type: "Bold Cat Eye",
                        intensity: "Heavy",
                        look: "Strong Elongation",
                        priority: 2
                    },
                    {
                        name: "Staycation",
                        description: "Heavy doll-eye for those who want big 'doll' drama",
                        style_type: "Voluminous Doll Eye",
                        intensity: "Heavy",
                        look: "Doll Drama",
                        priority: 3
                    }
                ]
            },
            "Hooded": {
                "Small": [
                    {
                        name: "Flare",
                        description: "Natural doll-eye specifically designed for small hooded eyes",
                        style_type: "Natural Doll Eye",
                        intensity: "Natural",
                        look: "Hooded-Friendly",
                        priority: 1
                    },
                    {
                        name: "Other Half 1",
                        description: "Very natural half-lash, ideal for small hooded lids",
                        style_type: "Natural Half-Lash",
                        intensity: "Natural",
                        look: "Lightweight",
                        priority: 2
                    },
                    {
                        name: "Drunk in Love",
                        description: "Proper cat-eye, perfect when they want a glam lifted look",
                        style_type: "Cat Eye",
                        intensity: "Medium",
                        look: "Glam Lift",
                        priority: 3
                    }
                ],
                "Medium": [
                    {
                        name: "Other Half 2",
                        description: "Cat-eye half-lash, lifts outer corners without weighing down the lid",
                        style_type: "Cat-Eye Half-Lash",
                        intensity: "Medium",
                        look: "Lifted",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Soft cat-eye, wispy and hooded-friendly for medium eyes",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Wispy Lift",
                        priority: 2
                    },
                    {
                        name: "Iconic",
                        description: "Universal wispy glam, slight cat-eye, for fuller looks",
                        style_type: "Wispy Glam",
                        intensity: "Medium-Heavy",
                        look: "Fuller Glam",
                        priority: 3
                    }
                ],
                "Large": [
                    {
                        name: "Other Half 2",
                        description: "Softer half-lash option for lift without bulk",
                        style_type: "Cat-Eye Half-Lash",
                        intensity: "Medium",
                        look: "Soft Lift",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Wispy cat-eye, great for large hooded eyes",
                        style_type: "Wispy Cat Eye",
                        intensity: "Medium",
                        look: "Flattering",
                        priority: 2
                    },
                    {
                        name: "Vixen",
                        description: "Heavy cat-eye, best for bold looks on big/medium hooded eyes",
                        style_type: "Bold Cat Eye",
                        intensity: "Heavy",
                        look: "Bold Drama",
                        priority: 3
                    }
                ]
            },
            "Monolid": {
                "Small": [
                    {
                        name: "Flare",
                        description: "Natural doll-eye, light and suitable for small eyes",
                        style_type: "Natural Doll Eye",
                        intensity: "Natural",
                        look: "Light & Natural",
                        priority: 1
                    },
                    {
                        name: "Other Half 1",
                        description: "Natural half-lash, adds outer lift without overpowering",
                        style_type: "Natural Half-Lash",
                        intensity: "Natural",
                        look: "Subtle Lift",
                        priority: 2
                    },
                    {
                        name: "Drunk in Love",
                        description: "Cat-eye option for a stronger elongated effect",
                        style_type: "Cat Eye",
                        intensity: "Medium",
                        look: "Elongated",
                        priority: 3
                    }
                ],
                "Medium": [
                    {
                        name: "Wedding Day",
                        description: "Balanced doll-eye, suits all shapes and sizes",
                        style_type: "Universal Doll Eye",
                        intensity: "Medium",
                        look: "Balanced",
                        priority: 1
                    },
                    {
                        name: "Iconic",
                        description: "Universal slight cat-eye/doll, medium–heavy glam",
                        style_type: "Cat-Doll Hybrid",
                        intensity: "Medium-Heavy",
                        look: "Versatile Glam",
                        priority: 2
                    },
                    {
                        name: "Foxy",
                        description: "Soft cat-eye, wispy, flattering for medium monolids",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Wispy Glam",
                        priority: 3
                    }
                ],
                "Large": [
                    {
                        name: "Wedding Day",
                        description: "Softer everyday option for large eyes",
                        style_type: "Soft Doll Eye",
                        intensity: "Medium",
                        look: "Everyday Glam",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Wispy cat-eye to shape and define",
                        style_type: "Wispy Cat Eye",
                        intensity: "Medium",
                        look: "Defining",
                        priority: 2
                    },
                    {
                        name: "Staycation",
                        description: "Heavy, fluffy doll-eye for maximum drama on big monolid eyes",
                        style_type: "Voluminous Doll Eye",
                        intensity: "Heavy",
                        look: "Maximum Drama",
                        priority: 3
                    }
                ]
            },
            "Downturned": {
                "Small": [
                    {
                        name: "Other Half 1",
                        description: "Soft half-lash, subtle lift at outer corner",
                        style_type: "Natural Half-Lash",
                        intensity: "Natural",
                        look: "Subtle Lift",
                        priority: 1
                    },
                    {
                        name: "Other Half 2",
                        description: "Cat-eye half-lash, stronger outer-corner lift",
                        style_type: "Cat-Eye Half-Lash",
                        intensity: "Medium",
                        look: "Strong Lift",
                        priority: 2
                    },
                    {
                        name: "Drunk in Love",
                        description: "Full cat-eye for noticeable uplift and glam",
                        style_type: "Cat Eye",
                        intensity: "Medium",
                        look: "Uplifting Glam",
                        priority: 3
                    }
                ],
                "Medium": [
                    {
                        name: "Other Half 2",
                        description: "Precise outer-corner lift without too much volume",
                        style_type: "Cat-Eye Half-Lash",
                        intensity: "Medium",
                        look: "Precise Lift",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Soft cat-eye, elongates and lifts the eye's silhouette",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Lifting",
                        priority: 2
                    },
                    {
                        name: "Iconic",
                        description: "Wispy slight cat-eye to enhance and glam up",
                        style_type: "Wispy Cat-Glam",
                        intensity: "Medium-Heavy",
                        look: "Enhanced Glam",
                        priority: 3
                    }
                ],
                "Large": [
                    {
                        name: "Other Half 2",
                        description: "Lighter half-lash for subtle correction",
                        style_type: "Cat-Eye Half-Lash",
                        intensity: "Medium",
                        look: "Subtle Correction",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Soft cat-eye, very flattering for large downturned eyes",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Flattering",
                        priority: 2
                    },
                    {
                        name: "Vixen",
                        description: "Heavy cat-eye for dramatic lifting effect",
                        style_type: "Bold Cat Eye",
                        intensity: "Heavy",
                        look: "Dramatic Lift",
                        priority: 3
                    }
                ]
            },
            "Upturned": {
                "Small": [
                    {
                        name: "Flare",
                        description: "Natural doll-eye for everyday, keeps the look soft",
                        style_type: "Natural Doll Eye",
                        intensity: "Natural",
                        look: "Soft Everyday",
                        priority: 1
                    },
                    {
                        name: "Wedding Day",
                        description: "Medium doll-eye for a balanced, open look",
                        style_type: "Doll Eye",
                        intensity: "Medium",
                        look: "Balanced",
                        priority: 2
                    },
                    {
                        name: "Other Half 1",
                        description: "Soft half-lash for a gentle outer emphasis",
                        style_type: "Natural Half-Lash",
                        intensity: "Natural",
                        look: "Gentle Emphasis",
                        priority: 3
                    }
                ],
                "Medium": [
                    {
                        name: "Wedding Day",
                        description: "Universal doll-eye, ideal baseline choice",
                        style_type: "Universal Doll Eye",
                        intensity: "Medium",
                        look: "Universal",
                        priority: 1
                    },
                    {
                        name: "Iconic",
                        description: "Slight cat-eye/doll, wispy glam for more intensity",
                        style_type: "Wispy Glam",
                        intensity: "Medium-Heavy",
                        look: "Intense Glam",
                        priority: 2
                    },
                    {
                        name: "Foxy",
                        description: "Soft cat-eye for those who want a more elongated, sultry look",
                        style_type: "Soft Cat Eye",
                        intensity: "Medium",
                        look: "Sultry",
                        priority: 3
                    }
                ],
                "Large": [
                    {
                        name: "Wedding Day",
                        description: "Soft option for big upturned eyes",
                        style_type: "Soft Doll Eye",
                        intensity: "Medium",
                        look: "Soft Glam",
                        priority: 1
                    },
                    {
                        name: "Foxy",
                        description: "Wispy cat-eye to define outer corners",
                        style_type: "Wispy Cat Eye",
                        intensity: "Medium",
                        look: "Defining",
                        priority: 2
                    },
                    {
                        name: "Staycation",
                        description: "Heavy fluffy doll-eye for full glam and volume",
                        style_type: "Voluminous Doll Eye",
                        intensity: "Heavy",
                        look: "Full Glam",
                        priority: 3
                    }
                ]
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

        // Check for hooded eyes first
        if (lidVisibility < 0.3) {
            return "Hooded";
        }

        // Check for monolid (very low lid visibility with specific characteristics)
        if (lidVisibility < 0.35 && ear < 0.4) {
            return "Monolid";
        }

        // Check for round eyes
        if (ear > 0.5) {
            return "Round";
        }

        // Check for almond, upturned, and downturned based on aspect ratio and angle
        if (ear < 0.35) {
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

    recommendEyelashes(shape, size, spacing) {
        // Get recommendations based on shape and size
        const products = this.recommendations[shape]?.[size] || [];

        // Add match scores based on priority
        const recommendedProducts = products.map(product => ({
            ...product,
            match_score: 100 - (product.priority - 1) * 10,
            category: this.getCategoryFromStyleType(product.style_type)
        }));

        // Application tips based on spacing
        const spacingTips = {
            "Close-set": "Focus application on outer 2/3 of lash line to create width and balance",
            "Wide-set": "Focus application on inner 2/3 of lash line to bring eyes closer together",
            "Average-set": "Apply evenly across entire lash line for a balanced, harmonious look"
        };

        // Shape-specific tips
        const shapeTips = {
            "Hooded": "Your hooded eyes look stunning with curled, wispy lashes that lift and open the eye. Avoid heavy styles that can weigh down your lid.",
            "Round": "Elongate your beautiful round eyes with cat-eye styles that emphasize the outer corners for a sultry, balanced look.",
            "Almond": "Lucky you! Your almond eyes are incredibly versatile and can rock any lash style - experiment with different looks!",
            "Downturned": "Lift and enhance your eye shape with curled lashes that have extra volume at the outer corners for an uplifting effect.",
            "Upturned": "Balance your naturally lifted eyes with even length across the lash line or doll-eye styles for a harmonious look.",
            "Monolid": "Your monolid eyes look gorgeous with styles that add dimension and definition. Focus on curl and length to make your eyes pop!"
        };

        return {
            top_picks: recommendedProducts,
            all_suitable: recommendedProducts,
            application_tip: spacingTips[spacing] || "Apply lashes evenly for best results",
            shape_tip: shapeTips[shape] || "Choose lashes that complement your unique eye shape",
            total_matches: recommendedProducts.length
        };
    }

    getCategoryFromStyleType(styleType) {
        if (styleType.includes("Cat")) {
            return "Cat Eye Styles";
        } else if (styleType.includes("Doll")) {
            return "Doll Eye Styles";
        } else if (styleType.includes("Natural") || styleType.includes("Half-Lash")) {
            return "Natural Styles";
        } else {
            return "Specialty Styles";
        }
    }

    async analyzeAndRecommend(imageElement) {
        await this.loadModel();

        const predictions = await this.faceMeshModel.estimateFaces(imageElement);

        if (!predictions || predictions.length === 0) {
            throw new Error("No face detected in image. Please ensure your face is clearly visible and well-lit.");
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

// ---------- APPLICATION LOGIC ----------
document.addEventListener('DOMContentLoaded', function () {
    // Application State
    let currentImage = null;
    let selectedEyelash = null;
    let currentMode = null;
    let stream = null;
    let eyelashImages = {};

    // Adjustment values
    let adjustments = {
        vertical: -10,
        horizontal: 0,
        scale: 2.0,
        height: 1.0,
        rotation: 0
    };

    // Initialize systems
    const recommender = new EyelashRecommendationSystem();
    const tryOnSystem = new EyelashTryOnSystem();

    // Eyelash data with image paths
    const EYELASHES = {
        "Drunk in Love": { name: "Drunk in Love", image: "eyelashes/Drunk In Love.png" },
        "Foxy": { name: "Foxy", image: "eyelashes/Foxy.png" },
        "Flare": { name: "Flare", image: "eyelashes/Flare.png" },
        "Iconic": { name: "Iconic", image: "eyelashes/Iconic.png" },
        "Other Half 2": { name: "Other Half 2", image: "eyelashes/Other Half 2.png" },
        "Other Half 1": { name: "Other Half 1", image: "eyelashes/Other Half 1.png" },
        "Staycation": { name: "Staycation", image: "eyelashes/Staycation.png" },
        "Vixen": { name: "Vixen", image: "eyelashes/Vixen.png" },
        "Wedding Day": { name: "Wedding Day", image: "eyelashes/Wedding Day.png" }
    };

    // DOM Elements
    const uploadBtn = document.getElementById('uploadBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadBtnBottom = document.getElementById('uploadBtnBottom');
    const cameraBtnBottom = document.getElementById('cameraBtnBottom');
    const fileInputBottom = document.getElementById('fileInputBottom');
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const imageContainer = document.getElementById('imageContainer');
    const imagePreview = document.getElementById('imagePreview');
    const resultCanvas = document.getElementById('resultCanvas');
    const uploadSection = document.getElementById('uploadSection');
    const bottomControls = document.getElementById('bottomControls');
    const adjustmentControls = document.getElementById('adjustmentControls');
    const modeSelection = document.getElementById('modeSelection');
    const modeSwitcher = document.getElementById('modeSwitcher');
    const currentModeText = document.getElementById('currentModeText');
    const switchToTryOn = document.getElementById('switchToTryOn');
    const switchToRecommend = document.getElementById('switchToRecommend');
    const tryOnContent = document.getElementById('tryOnContent');
    const recommendContent = document.getElementById('recommendContent');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Initialize
    function init() {
        setupEventListeners();
        // Initially show only upload/camera buttons
        resetToInitialState();
    }

    function resetToInitialState() {
        // Hide everything except header and upload section
        modeSelection.style.display = 'none';
        modeSwitcher.style.display = 'none';
        tryOnContent.style.display = 'none';
        recommendContent.style.display = 'none';
        adjustmentControls.style.display = 'none';
        imageContainer.style.display = 'none';
        videoContainer.style.display = 'none';
        bottomControls.style.display = 'none';
        uploadSection.style.display = 'flex';
    }

    function setupEventListeners() {
        uploadBtn.addEventListener('click', () => fileInput.click());
        cameraBtn.addEventListener('click', startCamera);
        fileInput.addEventListener('change', handleFileUpload);

        uploadBtnBottom.addEventListener('click', () => fileInputBottom.click());
        cameraBtnBottom.addEventListener('click', startCamera);
        fileInputBottom.addEventListener('change', handleFileUpload);

        captureBtn.addEventListener('click', capturePhoto);

        document.getElementById('tryOnModeBtn').addEventListener('click', () => showMode('tryon'));
        document.getElementById('recommendModeBtn').addEventListener('click', () => showMode('recommend'));

        // Mode switcher buttons
        switchToTryOn.addEventListener('click', () => showMode('tryon'));
        switchToRecommend.addEventListener('click', () => showMode('recommend'));

        document.getElementById('analyzeBtn').addEventListener('click', analyzeAndRecommend);

        // Adjustment controls
        document.getElementById('upBtn').addEventListener('click', () => adjustPosition('up'));
        document.getElementById('downBtn').addEventListener('click', () => adjustPosition('down'));
        document.getElementById('leftBtn').addEventListener('click', () => adjustPosition('left'));
        document.getElementById('rightBtn').addEventListener('click', () => adjustPosition('right'));
        document.getElementById('plusBtn').addEventListener('click', () => adjustScale('plus'));
        document.getElementById('minusBtn').addEventListener('click', () => adjustScale('minus'));
        document.getElementById('rotateLeftBtn').addEventListener('click', () => adjustRotation('left'));
        document.getElementById('rotateRightBtn').addEventListener('click', () => adjustRotation('right'));
        document.getElementById('resetBtn').addEventListener('click', resetAdjustments);
    }

    // File Upload
    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                displayImage(img);
                showModeSelection();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Camera
    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 640, height: 480 }
            });
            video.srcObject = stream;
            uploadSection.style.display = 'none';
            imageContainer.style.display = 'none';
            bottomControls.style.display = 'none';
            videoContainer.style.display = 'block';
        } catch (err) {
            alert('Could not access camera: ' + err.message);
        }
    }

    function capturePhoto() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        // Mirror the image to match the video feed
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        ctx.drawImage(video, 0, 0);

        const img = new Image();
        img.onload = () => {
            currentImage = img;
            stopCamera();
            displayImage(img);
            showModeSelection();
        };
        img.src = canvas.toDataURL('image/jpeg');
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        videoContainer.style.display = 'none';
    }

    // Display Functions
    function displayImage(img) {
        // Reset image preview styling
        imagePreview.style.maxWidth = '100%';
        imagePreview.style.maxHeight = '400px';
        imagePreview.style.width = 'auto';
        imagePreview.style.height = 'auto';
        imagePreview.style.objectFit = 'contain';

        imagePreview.src = img.src;
        // Show image with bottom controls
        uploadSection.style.display = 'none';
        videoContainer.style.display = 'none';
        imageContainer.style.display = 'flex';
        bottomControls.style.display = 'flex';
        resultCanvas.style.display = 'none';
        imagePreview.style.display = 'block';
    }

    function displayResult(canvas) {
        // Set canvas to standard size
        resultCanvas.style.maxWidth = '100%';
        resultCanvas.style.maxHeight = '400px';
        resultCanvas.style.width = 'auto';
        resultCanvas.style.height = 'auto';
        resultCanvas.style.objectFit = 'contain';

        resultCanvas.width = canvas.width;
        resultCanvas.height = canvas.height;
        const ctx = resultCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0);

        imagePreview.style.display = 'none';
        resultCanvas.style.display = 'block';
        // Show adjustment controls only when eyelash is applied
        adjustmentControls.style.display = 'block';
    }

    // Mode Selection
    function showModeSelection() {
        modeSelection.style.display = 'block';
        modeSwitcher.style.display = 'none';
        tryOnContent.style.display = 'none';
        recommendContent.style.display = 'none';
        adjustmentControls.style.display = 'none';
    }

    function showMode(mode) {
        currentMode = mode;
        modeSelection.style.display = 'none';
        modeSwitcher.style.display = 'block';
        adjustmentControls.style.display = 'none'; // Hide adjustments when switching modes

        // Update mode switcher buttons
        if (mode === 'tryon') {
            switchToTryOn.classList.add('active');
            switchToRecommend.classList.remove('active');
            currentModeText.textContent = 'Try-On';
        } else {
            switchToTryOn.classList.remove('active');
            switchToRecommend.classList.add('active');
            currentModeText.textContent = 'Recommendation';
        }

        if (mode === 'tryon') {
            populateLashesGrid();
            tryOnContent.style.display = 'block';
            recommendContent.style.display = 'none';
        } else {
            tryOnContent.style.display = 'none';
            recommendContent.style.display = 'block';
            document.getElementById('recommendationsSection').style.display = 'none';
        }
    }

    // Populate Lashes Grid
    function populateLashesGrid() {
        const grid = document.getElementById('lashesGrid');
        grid.innerHTML = '';

        Object.entries(EYELASHES).forEach(([key, lash]) => {
            const card = createLashCard(lash, key);
            card.addEventListener('click', () => selectLash(key, lash));
            grid.appendChild(card);
        });
    }

    function createLashCard(lash, key) {
        const card = document.createElement('div');
        card.className = 'lash-card';
        card.innerHTML = `
            <img src="${lash.image}" alt="${lash.name}" onerror="this.src='eyelashes/placeholder.png'">
            <p>${lash.name}</p>
        `;
        card.dataset.lashKey = key;
        return card;
    }

    // Select and Apply Lash
    async function selectLash(key, lash) {
        if (!currentImage) {
            alert('Please upload or capture an image first');
            return;
        }

        selectedEyelash = key;

        adjustments = {
            vertical: -10,
            horizontal: 0,
            scale: 2.0,
            height: 1.0,
            rotation: 0
        };
        document.getElementById('scaleValue').textContent = '2.0';

        // Highlight selected
        document.querySelectorAll('.lash-card').forEach(c => c.classList.remove('selected'));
        document.querySelector(`[data-lash-key="${key}"]`).classList.add('selected');

        // Apply try-on
        await applyTryOn();
    }

    async function applyTryOn() {
        if (!currentImage || !selectedEyelash) return;

        loadingOverlay.style.display = 'flex';

        try {
            const eyelashImg = await loadEyelashImage(selectedEyelash);

            const options = {
                vertical_offset: adjustments.vertical,
                horizontal_offset: adjustments.horizontal,
                size_scale: adjustments.scale,
                height_scale: adjustments.height,
                rotation_angle: adjustments.rotation
            };

            const resultCan = await tryOnSystem.processEyelash(currentImage, eyelashImg, options);
            displayResult(resultCan);
        } catch (err) {
            alert('Error applying eyelash: ' + err.message);
            console.error(err);
        } finally {
            loadingOverlay.style.display = 'none';
        }
    }

    // Load Eyelash Image
    async function loadEyelashImage(key) {
        if (eyelashImages[key]) {
            return eyelashImages[key];
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                eyelashImages[key] = img;
                resolve(img);
            };
            img.onerror = () => reject(new Error(`Could not load eyelash: ${key}`));
            img.src = EYELASHES[key].image;
        });
    }

    // Adjustment Controls
    function adjustPosition(direction) {
        const step = 5;
        switch (direction) {
            case 'up': adjustments.vertical -= step; break;
            case 'down': adjustments.vertical += step; break;
            case 'left': adjustments.horizontal -= step; break;
            case 'right': adjustments.horizontal += step; break;
        }
        applyTryOn();
    }

    function adjustScale(direction) {
        const step = 0.1;
        if (direction === 'plus') {
            adjustments.scale = Math.min(3.0, adjustments.scale + step);
        } else {
            adjustments.scale = Math.max(0.5, adjustments.scale - step);
        }
        document.getElementById('scaleValue').textContent = adjustments.scale.toFixed(1);
        applyTryOn();
    }

    function adjustRotation(direction) {
        const step = 5;
        if (direction === 'left') {
            adjustments.rotation -= step;
        } else {
            adjustments.rotation += step;
        }
        applyTryOn();
    }

    function resetAdjustments() {
        adjustments = {
            vertical: -10,
            horizontal: 0,
            scale: 2.0,
            height: 1.0,
            rotation: 0
        };
        document.getElementById('scaleValue').textContent = '2.0';
        applyTryOn();
    }

    // Recommendation System
    async function analyzeAndRecommend() {
        if (!currentImage) {
            alert('Please upload or capture an image first');
            return;
        }

        loadingOverlay.style.display = 'flex';

        try {
            const result = await recommender.analyzeAndRecommend(currentImage);
            displayRecommendations(result);
        } catch (err) {
            alert('Error analyzing image: ' + err.message);
            console.error(err);
        } finally {
            loadingOverlay.style.display = 'none';
        }
    }

    function displayRecommendations(result) {
        const { classification, measurements, recommendations } = result;

        // Show recommendations section
        document.getElementById('recommendationsSection').style.display = 'block';

        // Display top picks
        const topPicks = document.getElementById('topPicks');
        topPicks.innerHTML = '';

        recommendations.top_picks.slice(0, 3).forEach((product, index) => {
            const lashKey = Object.keys(EYELASHES).find(k =>
                EYELASHES[k].name.toLowerCase() === product.name.toLowerCase()
            );

            if (lashKey) {
                const card = createLashCard(EYELASHES[lashKey], lashKey);
                card.classList.add('recommended');
                card.addEventListener('click', () => {
                    showMode('tryon');
                    setTimeout(() => selectLash(lashKey, EYELASHES[lashKey]), 100);
                });
                topPicks.appendChild(card);
            }
        });

        // Display all lashes
        const allLashesGrid = document.getElementById('allLashesGrid');
        allLashesGrid.innerHTML = '';

        Object.entries(EYELASHES).forEach(([key, lash]) => {
            const card = createLashCard(lash, key);
            card.addEventListener('click', () => {
                showMode('tryon');
                setTimeout(() => selectLash(key, lash), 100);
            });
            allLashesGrid.appendChild(card);
        });

        // Display analysis info
        const analysisInfo = document.getElementById('analysisInfo');
        analysisInfo.innerHTML = `
            <h4>Your Eye Analysis</h4>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Eye Shape:</span>
                    <span class="value">${classification.eye_shape}</span>
                </div>
                <div class="info-item">
                    <span class="label">Eye Size:</span>
                    <span class="value">${classification.eye_size}</span>
                </div>
                <div class="info-item">
                    <span class="label">Eye Spacing:</span>
                    <span class="value">${classification.eye_spacing}</span>
                </div>
                <div class="info-item">
                    <span class="label">Symmetry:</span>
                    <span class="value">${(measurements.symmetry_score * 100).toFixed(0)}%</span>
                </div>
            </div>
            ${recommendations.shape_tip ? `<p class="tip">💡 ${recommendations.shape_tip}</p>` : ''}
            ${recommendations.application_tip ? `<p class="tip">✨ ${recommendations.application_tip}</p>` : ''}
        `;
    }

    // Initialize app
    init();
});