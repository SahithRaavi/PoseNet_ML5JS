let capture;
let posenet = null;
let singlePose, skeleton;
let actor_img;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.size(800, 500); // Ensure the capture size matches the canvas
    capture.hide();
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
    actor_img = loadImage('images/d.jpg');
}

function receivedPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    image(capture, 0, 0); // Make sure the video feed is drawn with the correct dimensions

    if (singlePose) {
        fill(255, 0, 0);
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }

        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        image(actor_img, singlePose.nose.x - 45, singlePose.nose.y - 60, 100, 100);
    }
}