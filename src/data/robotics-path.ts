import { LearningPath } from '@/types';

export const roboticsPath: LearningPath = {
  id: 'robotics',
  title: 'Robotics Fundamentals',
  slug: 'robotics',
  description: 'Build a strong foundation in robotics: kinematics, control systems, computer vision, sensor fusion, and path planning.',
  longDescription: 'This learning path covers the fundamental science and engineering behind robotics. From kinematics and dynamics, to PID controllers and state estimation, visual processing, path planning, and programming essentials. You will gain the knowledge needed to design and build robots from the ground up.',
  icon: 'Cpu',
  color: '#8B5CF6',
  gradient: 'from-violet-500 to-purple-500',
  prerequisites: ['Basic mathematics (linear algebra, calculus)', 'Basic programming (Python or C++)', 'High school physics'],
  estimatedDuration: '14-20 weeks',
  difficulty: 'Beginner to Advanced',
  tags: ['Kinematics', 'Control Systems', 'Computer Vision', 'Sensor Fusion', 'Path Planning'],
  topics: [
    {
      id: 'kinematics',
      title: 'Kinematics & Dynamics',
      description: 'How robots move: forward/inverse kinematics, dynamics, and motion equations.',
      icon: 'Move',
      order: 1,
      subtopics: [
        {
          id: 'forward-inverse-kinematics',
          title: 'Forward & Inverse Kinematics',
          description: 'Calculate end-effector positions and solve for joint angles.',
          difficulty: 'intermediate',
          estimatedTime: '5-6 hours',
          content: `# Forward & Inverse Kinematics

## Forward Kinematics (FK)
Given joint angles → Calculate end-effector position

### DH Convention
| Parameter | Description |
|---|---|
| θ (theta) | Joint angle (rotation about z-axis) |
| d | Link offset (translation along z-axis) |
| a | Link length (translation along x-axis) |
| α (alpha) | Link twist (rotation about x-axis) |

### Python Example
\`\`\`python
import numpy as np

def dh_transform(theta, d, a, alpha):
    ct, st = np.cos(theta), np.sin(theta)
    ca, sa = np.cos(alpha), np.sin(alpha)
    return np.array([
        [ct, -st*ca,  st*sa, a*ct],
        [st,  ct*ca, -ct*sa, a*st],
        [0,   sa,     ca,    d   ],
        [0,   0,      0,     1   ]
    ])

L1, L2 = 1.0, 0.8
q1, q2 = np.radians(30), np.radians(45)
T02 = dh_transform(q1, 0, L1, 0) @ dh_transform(q2, 0, L2, 0)
end_effector = T02[:3, 3]
\`\`\`

## Inverse Kinematics (IK)
Given desired position → Calculate joint angles

\`\`\`python
def ik_2link(x, y, L1, L2):
    D = (x**2 + y**2 - L1**2 - L2**2) / (2 * L1 * L2)
    if abs(D) > 1: raise ValueError("Out of reach")
    q2 = np.arctan2(np.sqrt(1 - D**2), D)
    q1 = np.arctan2(y, x) - np.arctan2(L2*np.sin(q2), L1 + L2*np.cos(q2))
    return q1, q2
\`\`\``,
          keyTakeaways: [
            'FK: joint angles → end-effector position',
            'IK: desired position → joint angles',
            'DH convention provides systematic robot geometry description',
            'IK can have multiple solutions or no solution'
          ],
          videos: [
            { id: 'kin-1', title: 'Robot Kinematics Explained', channel: 'Angela Sodemann', url: 'https://www.youtube.com/playlist?list=PLT_0lwItn0sDBE98BsbaZezflB96ws12b', description: 'Comprehensive kinematics playlist: DH parameters, FK, and IK.' },
            { id: 'kin-2', title: 'Modern Robotics - Kinematics', channel: 'Northwestern Robotics', url: 'https://www.youtube.com/playlist?list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx', description: 'University-level lectures from the Modern Robotics textbook.' },
            { id: 'kin-3', title: 'Robotics 2: Dynamics and Control', channel: 'Angela Sodemann', url: 'https://www.youtube.com/playlist?list=PL1YrgW7ROFofAq700aQWlVvLgW1Xm9c4z', description: 'Jacobians, singularity analysis, Euler-Lagrange dynamics.' },
            { id: 'kin-4', title: 'ROB 101: Computational Linear Algebra', channel: 'University of Michigan Robotics', url: 'https://www.youtube.com/playlist?list=PLdPQZLMHRjDJ5d_dE4FC_Q8JKU3inL8BV', description: 'Free university course covering linear algebra foundations needed for kinematics: transformations, matrix operations.' }
          ]
        }
      ]
    },
    {
      id: 'control-systems',
      title: 'Control Systems',
      description: 'PID controllers, state-space control, and modern control techniques.',
      icon: 'Gauge',
      order: 2,
      subtopics: [
        {
          id: 'pid-control',
          title: 'PID Control',
          description: 'Implement and tune PID controllers for precise motion control.',
          difficulty: 'intermediate',
          estimatedTime: '4-5 hours',
          content: `# PID Control

\`\`\`
u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt
\`\`\`

| Term | Effect | Risk |
|---|---|---|
| P | Reacts to current error | Steady-state error |
| I | Accumulates past errors | Overshoot, wind-up |
| D | Predicts future error | Noise amplification |

## Python Implementation
\`\`\`python
class PIDController:
    def __init__(self, Kp, Ki, Kd, limits=None):
        self.Kp, self.Ki, self.Kd = Kp, Ki, Kd
        self.limits = limits
        self.integral = 0.0
        self.prev_error = 0.0

    def update(self, setpoint, measured, dt):
        error = setpoint - measured
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt if dt > 0 else 0
        output = self.Kp * error + self.Ki * self.integral + self.Kd * derivative
        if self.limits:
            output = max(self.limits[0], min(self.limits[1], output))
        self.prev_error = error
        return output
\`\`\`

## Tuning: Ziegler-Nichols
1. Set Ki=0, Kd=0. Increase Kp until oscillation (Ku)
2. Measure period (Tu)
3. Kp=0.6·Ku, Ki=2·Kp/Tu, Kd=Kp·Tu/8`,
          keyTakeaways: [
            'PID combines proportional, integral, and derivative control',
            'Anti-windup prevents integral from growing unbounded',
            'Start with P, add D, then add small I'
          ],
          videos: [
            { id: 'pid-1', title: 'PID Control - A Brief Introduction', channel: 'Brian Douglas', url: 'https://www.youtube.com/watch?v=UR0hOmjaHp0', description: 'Excellent introduction to PID control theory.' },
            { id: 'pid-2', title: 'Understanding PID Control', channel: 'MATLAB', url: 'https://www.youtube.com/playlist?list=PLn8PRpmsu08pQBgjxYFXSsODEF3Jqmm-y', description: 'MATLAB official PID series with visual explanations.' },
            { id: 'pid-3', title: 'Control Systems Full Course', channel: 'Brian Douglas', url: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHX1n_mFDMWnQcbheYuq4ZAGu', description: 'Complete control systems: Bode plots, root locus, and more.' },
            { id: 'pid-4', title: 'Control Bootcamp', channel: 'Steve Brunton', url: 'https://www.youtube.com/playlist?list=PLMrJAkhIeNNR20Mz-VpzgfQs5zrYi085m', description: '39-video playlist on modern state-space control theory.' },
            { id: 'pid-5', title: 'Data-Driven Science and Engineering', channel: 'Eigensteve (Steve Brunton)', url: 'https://www.youtube.com/playlist?list=PLMrJAkhIeNNRHP5UA-gIimsXLQyHXxRty', description: 'Data-driven control methods: DMD, Koopman operators, SINDy. Bridges classical and modern ML-based control.' }
          ]
        }
      ]
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      description: 'Image processing, object detection, and deep learning for vision.',
      icon: 'Eye',
      order: 3,
      subtopics: [
        {
          id: 'opencv-fundamentals',
          title: 'OpenCV Fundamentals',
          description: 'Image processing, feature detection, and object tracking.',
          difficulty: 'intermediate',
          estimatedTime: '5-6 hours',
          content: `# OpenCV Fundamentals

\`\`\`python
import cv2
import numpy as np

# HSV color detection
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, np.array([0,120,70]), np.array([10,255,255]))

# Edge detection & contours
edges = cv2.Canny(gray, 50, 150)
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Feature detection (ORB)
orb = cv2.ORB_create(nfeatures=500)
keypoints, descriptors = orb.detectAndCompute(gray, None)

# Camera calibration
ret, mtx, dist, rvecs, tvecs = cv2.calibrateCamera(
    objpoints, imgpoints, gray.shape[::-1], None, None)
\`\`\``,
          keyTakeaways: [
            'OpenCV is the standard library for computer vision',
            'HSV color space is better for color-based detection',
            'Camera calibration is essential for accurate measurements'
          ],
          videos: [
            { id: 'cv-1', title: 'OpenCV Full Course with Python', channel: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=oXlwWbU8l2o', description: 'Complete 4-hour OpenCV course.' },
            { id: 'cv-2', title: 'OpenCV in 3 Hours', channel: "Murtaza's Workshop", url: 'https://www.youtube.com/watch?v=WQeoO7MIRXg', description: 'Practical robotics CV tutorial with real-time demos.' },
            { id: 'cv-3', title: 'CS231n: Deep Learning for Vision', channel: 'Stanford', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOmsNzYBMe0gJY2XS8AQg16', description: 'Gold-standard university lectures on CNNs and visual AI.' }
          ]
        },
        {
          id: 'dl-vision',
          title: 'Deep Learning for Vision',
          description: 'Neural networks for object detection, segmentation, and pose estimation.',
          difficulty: 'advanced',
          estimatedTime: '5-6 hours',
          content: `# Deep Learning for Robot Vision

| Model | Speed | Accuracy | Use Case |
|---|---|---|---|
| YOLO11 | Very Fast | Good+ | Real-time detection (current Ultralytics default, Oct 2024) |
| YOLO26 | Fast | High | NMS-free inference (2026) |
| YOLOv8 | Very Fast | Good | Legacy, widely deployed |
| Faster R-CNN | Slow | High | High accuracy |
| SAM | Moderate | High | Segmentation |

## YOLO11
\`\`\`python
from ultralytics import YOLO
model = YOLO('yolo11n.pt')
results = model('image.jpg')
for r in results:
    for box in r.boxes:
        print(f"{model.names[int(box.cls[0])]}: {box.conf[0]:.2f}")
\`\`\`

> **Note:** YOLO11 is the current Ultralytics default. YOLO26 introduced NMS-free inference in early 2026. The \`ultralytics\` package supports all versions — swap the model name to use older variants (e.g. \`yolov8n.pt\`).`,
          keyTakeaways: [
            'YOLO is the go-to for real-time object detection',
            'Custom training is essential for robot-specific objects',
            'Balance speed vs accuracy based on requirements'
          ],
          videos: [
            { id: 'dl-1', title: 'YOLO Object Detection', channel: 'Murtaza Hassan', url: 'https://www.youtube.com/watch?v=WgPbbWmnXJ8', description: 'Complete YOLO course with practical implementations.' },
            { id: 'dl-2', title: 'YOLO Object Detection & Tracking Bootcamp', channel: 'Ultralytics / freeCodeCamp', url: 'https://www.youtube.com/watch?v=WgPbbWmnXJ8', description: 'Comprehensive YOLO bootcamp covering detection, tracking, and deployment with the latest Ultralytics models.' }
          ]
        }
      ]
    },
    {
      id: 'sensor-fusion',
      title: 'Sensor Fusion & State Estimation',
      description: 'Combine data from multiple sensors for accurate state estimation.',
      icon: 'Layers',
      order: 4,
      subtopics: [
        {
          id: 'kalman-filter',
          title: 'Kalman Filter',
          description: 'Optimal sensor fusion and state estimation.',
          difficulty: 'advanced',
          estimatedTime: '5-6 hours',
          content: `# Kalman Filter

## Algorithm
**Predict**: x̂ = F·x + B·u, P = F·P·Fᵀ + Q
**Update**: K = P·Hᵀ·(H·P·Hᵀ + R)⁻¹, x̂ = x̂ + K·(z - H·x̂)

\`\`\`python
class KalmanFilter:
    def __init__(self, F, H, Q, R, x0, P0):
        self.F, self.H, self.Q, self.R = F, H, Q, R
        self.x, self.P = x0, P0

    def predict(self):
        self.x = self.F @ self.x
        self.P = self.F @ self.P @ self.F.T + self.Q

    def update(self, z):
        S = self.H @ self.P @ self.H.T + self.R
        K = self.P @ self.H.T @ np.linalg.inv(S)
        self.x = self.x + K @ (z - self.H @ self.x)
        self.P = (np.eye(len(self.x)) - K @ self.H) @ self.P
\`\`\``,
          keyTakeaways: [
            'Kalman filter is optimal for linear systems with Gaussian noise',
            'Predict step propagates state, update incorporates measurements',
            'EKF extends to nonlinear systems via linearization',
            'Used everywhere: GPS, IMU fusion, robot localization'
          ],
          videos: [
            { id: 'kf-1', title: 'Understanding Kalman Filters', channel: 'MATLAB', url: 'https://www.youtube.com/playlist?list=PLn8PRpmsu08pzi6EMiYnR-076Mh-q3tWr', description: 'MATLAB official Kalman filter series.' },
            { id: 'kf-2', title: 'Sensor Fusion and Tracking', channel: 'MATLAB', url: 'https://www.youtube.com/playlist?list=PLn8PRpmsu08pp7mgX0A5tN8H5R8k-p0d6', description: 'Multi-sensor state estimation: IMU, GPS, odometry fusion.' },
            { id: 'kf-3', title: 'Robot Mapping / SLAM Course', channel: 'Cyrill Stachniss', url: 'https://www.youtube.com/playlist?list=PLgnQpQtFTOGQrZ4O5QzbIHgl3b1JHimN_', description: 'Academic SLAM course: EKF, UKF, particle filters, graph SLAM.' }
          ]
        },
        {
          id: 'modern-slam',
          title: 'Modern SLAM Approaches',
          description: 'Graph-based SLAM, visual SLAM, LiDAR SLAM, and visual-inertial odometry.',
          difficulty: 'advanced',
          estimatedTime: '6-8 hours',
          content: `# Modern SLAM Approaches

## What is SLAM?

Simultaneous Localization and Mapping (SLAM) solves the chicken-and-egg problem: a robot needs a map to localize, but needs to know its location to build a map. Modern SLAM solves both simultaneously.

## Graph-Based SLAM Formulation

The dominant modern approach represents SLAM as a factor graph:
- **Nodes**: Robot poses and landmark positions
- **Edges (factors)**: Constraints from odometry and observations
- **Optimization**: Minimize total error across all constraints using nonlinear least squares (g2o, GTSAM, Ceres)

\`\`\`
Graph SLAM structure:
  x0 --odom--> x1 --odom--> x2 --odom--> x3
   |             |             |             |
  obs           obs           obs           obs
   |             |             |             |
  L0            L1            L0            L2   (landmarks)
                               ^--- loop closure!
\`\`\`

## Visual SLAM (ORB-SLAM3)

ORB-SLAM3 is the state-of-the-art feature-based visual SLAM system:
- Supports monocular, stereo, and RGB-D cameras
- Visual-inertial fusion for robust tracking
- Multi-map system for large-scale environments
- Real-time on standard hardware

### Direct vs. Feature-Based Methods

| Approach | Example | Pros | Cons |
|---|---|---|---|
| Feature-based | ORB-SLAM3 | Robust, accurate loop closure | Sparse map, feature dependency |
| Direct | LSD-SLAM, DSO | Dense/semi-dense maps | Sensitive to lighting changes |
| Hybrid | VINS-Fusion | Combines strengths | Higher complexity |

## LiDAR SLAM

### LIO-SAM (LiDAR-Inertial Odometry via Smoothing and Mapping)
- Tightly-coupled LiDAR-inertial odometry
- Factor graph optimization with IMU preintegration
- GPS factor for absolute positioning
- Standard for outdoor robotics

### FAST-LIO2 (Fast LiDAR-Inertial Odometry)
- Directly processes raw points (no feature extraction)
- Incremental k-d tree for fast nearest-neighbor search
- Extremely efficient: runs on embedded computers
- Excellent for resource-constrained platforms

### Comparison of SLAM Approaches

| System | Sensor | Environment | Real-time | Map Type |
|---|---|---|---|---|
| ORB-SLAM3 | Camera (+IMU) | Indoor/Outdoor | Yes | Sparse 3D |
| LIO-SAM | LiDAR + IMU | Outdoor | Yes | Dense 3D |
| FAST-LIO2 | LiDAR + IMU | Indoor/Outdoor | Yes | Dense 3D |
| RTAB-Map | RGB-D/Stereo | Indoor | Yes | Dense 3D |
| Cartographer | LiDAR (+IMU) | Indoor | Yes | 2D/3D |

## Visual-Inertial Odometry (VIO)

Combines camera and IMU for robust pose estimation:
- **Camera**: Rich spatial information, affected by lighting and motion blur
- **IMU**: High-rate rotation and acceleration, subject to drift
- **Fusion**: Camera corrects IMU drift; IMU bridges camera tracking failures

## Loop Closure Detection

Prevents accumulated drift by recognizing previously visited locations:
1. Extract visual features or descriptors from current frame
2. Query a database of past keyframes for matches
3. Verify geometric consistency of the match
4. Add loop closure constraint to the pose graph
5. Re-optimize the entire graph to correct drift`,
          keyTakeaways: [
            'Graph-based SLAM is the dominant modern formulation, replacing EKF-SLAM for large environments',
            'ORB-SLAM3 handles monocular, stereo, and RGB-D with visual-inertial fusion',
            'LiDAR-inertial systems (LIO-SAM, FAST-LIO2) are the standard for outdoor robotics',
            'Loop closure detection prevents accumulated drift in long trajectories'
          ],
          videos: [
            { id: 'slam-1', title: 'Robot Mapping / SLAM Course', channel: 'Cyrill Stachniss', url: 'https://www.youtube.com/playlist?list=PLgnQpQtFTOGQrZ4O5QzbIHgl3b1JHimN_', description: 'Comprehensive university SLAM course: EKF-SLAM, particle filters, graph-based SLAM, and loop closure.' },
            { id: 'slam-2', title: 'ROB 530: Mobile Robotics', channel: 'University of Michigan', url: 'https://www.youtube.com/playlist?list=PLdMorpQLjeXmbFaVku4JdjmQByHHqTd1F', description: 'Full course covering Bayesian filtering, SLAM, localization, and mapping. Free with GitHub materials.' }
          ]
        }
      ]
    },
    {
      id: 'path-planning',
      title: 'Path Planning',
      description: 'Plan collision-free paths using search and sampling-based methods.',
      icon: 'Route',
      order: 5,
      subtopics: [
        {
          id: 'planning-algorithms',
          title: 'Planning Algorithms',
          description: 'A*, RRT, PRM, and other path planning algorithms.',
          difficulty: 'intermediate',
          estimatedTime: '5-6 hours',
          content: `# Path Planning Algorithms

## A* Algorithm
\`\`\`python
import heapq
def astar(grid, start, goal):
    open_set = [(0, start)]
    came_from, g_score = {}, {start: 0}
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            return path[::-1]
        for dx, dy in [(0,1),(0,-1),(1,0),(-1,0)]:
            neighbor = (current[0]+dx, current[1]+dy)
            tentative_g = g_score[current] + 1
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                heapq.heappush(open_set, (tentative_g + heuristic(neighbor, goal), neighbor))
    return None
\`\`\`

| Algorithm | Optimal | Complete | Best For |
|---|---|---|---|
| A* | Yes | Yes | Low-dimensional |
| RRT | No | Probabilistic | High-dimensional |
| RRT* | Asymptotic | Probabilistic | Optimal in high-D |
| PRM | Asymptotic | Probabilistic | Multi-query |`,
          keyTakeaways: [
            'A* is optimal for grid-based 2D planning',
            'RRT works in high-dimensional configuration spaces',
            'Choose algorithm based on dimensionality and optimality needs'
          ],
          videos: [
            { id: 'pp-1', title: 'Modern Robotics: Motion Planning', channel: 'Northwestern Robotics', url: 'https://www.youtube.com/playlist?list=PLggLP4f-rq01Q3clJrnWFPRtpUwSlr4mG', description: 'C-space, A*, PRM, RRT, and RRT* lectures.' },
            { id: 'pp-2', title: 'Motion Planning Algorithms', channel: 'MATLAB', url: 'https://www.youtube.com/playlist?list=PLn8PRpmsu08qQorl_KLrSns9jI827aplS', description: 'Global and local path planning with simulation demos.' },
            { id: 'pp-3', title: 'Robotics: Computational Motion Planning', channel: 'University of Pennsylvania', url: 'https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zs14zKVDsp0MeTmtfpt0S0', description: 'Covers configuration spaces, graph search, sampling-based planning, and artificial potential fields.' }
          ]
        }
      ]
    },
    {
      id: 'programming-robotics',
      title: 'Programming for Robotics',
      description: 'Linux, Python, and C++ essentials for robotics development.',
      icon: 'Terminal',
      order: 6,
      subtopics: [
        {
          id: 'linux-python-cpp',
          title: 'Linux, Python & C++ Essentials',
          description: 'Master the tools and languages used in robotics.',
          difficulty: 'beginner',
          estimatedTime: '6-8 hours',
          content: `# Programming for Robotics

## Essential Linux Commands
\`\`\`bash
ssh user@robot_ip          # Remote access
scp file user@ip:~/       # Copy to remote
htop                       # System monitor
ros2 topic list           # ROS2 debugging
\`\`\`

## Python for Robotics
- NumPy for math and linear algebra
- OpenCV for computer vision
- rclpy for ROS2 nodes
- matplotlib for visualization

## C++ for Robotics
- rclcpp for ROS2 nodes (performance-critical)
- Eigen for linear algebra
- OpenCV C++ API
- CMake build system`,
          keyTakeaways: [
            'Ubuntu Linux is the primary OS for ROS2 development',
            'Python for prototyping, C++ for performance-critical nodes',
            'SSH enables remote access to robot computers'
          ],
          videos: [
            { id: 'linux-1', title: 'Linux Full Course', channel: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', description: 'Complete 6-hour Linux course covering everything needed for robotics.' },
            { id: 'cpp-1', title: 'Modern C++ for Robotics', channel: 'Cyrill Stachniss', url: 'https://www.youtube.com/playlist?list=PLgnQpQtFTOGRMxioXmP2tZl2I9Bq4A7gq', description: 'C++ tailored for robotics: RAII, smart pointers, CMake, Eigen.' },
            { id: 'cpp-2', title: 'C++ Series', channel: 'The Cherno', url: 'https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb', description: 'Best C++ deep-dive: memory, pointers, threading, optimization.' }
          ]
        }
      ]
    },
    {
      id: 'mechanical-design',
      title: '3D Printing & Mechanical Design',
      description: 'Design and fabricate robot structures with CAD and 3D printing.',
      icon: 'Box',
      order: 7,
      subtopics: [
        {
          id: 'cad-3dprint',
          title: 'CAD & 3D Printing for Robots',
          description: 'Design robot parts in Fusion 360 and manufacture with 3D printing.',
          difficulty: 'beginner',
          estimatedTime: '4-5 hours',
          content: `# CAD & 3D Printing for Robots

## Design Workflow
1. Sketch requirements and dimensions
2. Create 3D model in Fusion 360 / OnShape
3. Add joints and constraints
4. Export STL for 3D printing
5. Slice with PrusaSlicer / Cura
6. Print and iterate

## Key Design Principles
- **Wall thickness**: Min 1.2mm for FDM
- **Tolerances**: 0.2-0.3mm for press fits
- **Overhangs**: Max 45° without supports
- **Infill**: 20% for general, 50%+ for structural`,
          keyTakeaways: [
            'Fusion 360 is the most popular free CAD tool for robots',
            'Design for 3D printing: wall thickness, overhangs, tolerances',
            'Iterate rapidly: print, test, redesign'
          ],
          videos: [
            { id: 'cad-1', title: 'Fusion 360 in 30 Days', channel: 'Product Design Online', url: 'https://www.youtube.com/playlist?list=PLrZ2zKOtC_-DxMDVDslzY55cQ5qC2v0z7', description: 'Highest-rated CAD series: sketching, modeling, assemblies.' },
            { id: 'cad-2', title: 'openDog V3 Build', channel: 'James Bruton', url: 'https://www.youtube.com/playlist?list=PLrnWUD_Lk2WCtg5iZ-jO5u6_a581tL79S', description: 'Masterclass in 3D printed robot design and fabrication.' }
          ]
        }
      ]
    },
    {
      id: 'robot-learning',
      title: 'Robot Learning & AI',
      description: 'Reinforcement learning, sim-to-real transfer, and foundation models for robotics.',
      icon: 'Brain',
      order: 8,
      subtopics: [
        {
          id: 'rl-robotics',
          title: 'Reinforcement Learning for Robotics',
          description: 'Train robots through trial and error using deep reinforcement learning.',
          difficulty: 'advanced',
          estimatedTime: '6-8 hours',
          content: `# Reinforcement Learning for Robotics

## What is RL?

Reinforcement Learning (RL) trains an agent to make decisions by interacting with an environment. The agent receives rewards or penalties based on its actions and learns a policy that maximizes cumulative reward.

## Markov Decision Process (MDP)

RL problems are formalized as MDPs:

| Component | Description |
|---|---|
| State (s) | Current observation of the environment |
| Action (a) | What the robot does |
| Reward (r) | Scalar feedback signal |
| Transition (T) | Probability of next state given current state and action |
| Discount (γ) | How much future rewards matter (0.95-0.99 typical) |

## Key Algorithms for Robotics

### PPO (Proximal Policy Optimization)
- Most widely used for robot control
- Stable training with clipped objective
- Works well for locomotion, manipulation

### SAC (Soft Actor-Critic)
- Off-policy, sample-efficient
- Entropy regularization for exploration
- Good for continuous control tasks

### TD3 (Twin Delayed DDPG)
- Addresses overestimation in value functions
- Twin critics, delayed policy updates
- Strong performance on manipulation

## Training Loop

\\\`\\\`\\\`python
import gymnasium as gym

env = gym.make('FetchReach-v3')
obs, info = env.reset()

for step in range(10000):
    action = policy.predict(obs)  # neural network
    obs, reward, terminated, truncated, info = env.step(action)
    buffer.store(obs, action, reward)

    if len(buffer) > batch_size:
        policy.update(buffer.sample(batch_size))

    if terminated or truncated:
        obs, info = env.reset()
\\\`\\\`\\\`

## Reward Shaping

Designing rewards is the hardest part of RL for robotics:

- **Sparse rewards**: +1 on success, 0 otherwise. Hard to learn from.
- **Dense rewards**: continuous signal (e.g., negative distance to goal). Easier but can cause local optima.
- **Curriculum learning**: start with easy tasks, increase difficulty.
- **Hindsight Experience Replay (HER)**: treat failed attempts as successes for different goals.

## Simulation Environments

| Environment | Strength | Use Case |
|---|---|---|
| NVIDIA Isaac Lab | GPU-parallel, photorealistic | Large-scale RL training |
| MuJoCo | Fast contact physics | Manipulation, locomotion |
| PyBullet | Free, ROS-compatible | Prototyping |
| Gazebo + gym | ROS2 integration | Full robot stacks |

## Challenges

- **Sample efficiency**: robots need millions of trials; real hardware is slow
- **Safety**: random exploration can damage hardware
- **Sim-to-real gap**: policies trained in simulation may not transfer
- **Reward specification**: wrong rewards lead to unintended behaviors`,
          keyTakeaways: [
            'RL lets robots learn behaviors through interaction with their environment',
            'PPO and SAC are the most common algorithms for continuous robot control',
            'Reward shaping is critical — sparse rewards are hard to learn from',
            'Simulation is essential because RL needs millions of trials',
            'Sample efficiency and sim-to-real transfer are the main challenges'
          ],
          videos: [
            { id: 'rl-1', title: 'Stanford CS224R: Deep Reinforcement Learning', channel: 'Stanford Online', url: 'https://www.youtube.com/watch?v=Hp1WBWghrak', description: 'Stanford graduate course on deep RL for robotics: imitation learning, model-free and model-based RL. Spring 2025.' },
            { id: 'rl-2', title: 'RL for Robots: Isaac Lab Tutorial', channel: 'NVIDIA', url: 'https://www.youtube.com/watch?v=TMHkFDhVt7g', description: 'Hands-on RL for robotics using NVIDIA Isaac Lab. Covers environment setup and policy training.' },
            { id: 'rl-3', title: 'Stanford CS234: Reinforcement Learning', channel: 'Stanford Online', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX', description: 'Foundational RL course: MDPs, dynamic programming, TD learning, policy gradient, and deep RL.' }
          ]
        },
        {
          id: 'sim-to-real',
          title: 'Sim-to-Real Transfer',
          description: 'Bridge the gap between simulated training and real-world robot deployment.',
          difficulty: 'advanced',
          estimatedTime: '4-5 hours',
          content: `# Sim-to-Real Transfer

## The Reality Gap

Policies trained in simulation often fail on real robots because simulators cannot perfectly replicate:

- **Physics**: friction, contact dynamics, joint backlash
- **Sensors**: noise, latency, calibration errors
- **Actuators**: motor response, gear play, thermal effects
- **Environment**: lighting, textures, object properties

## Domain Randomization

Vary simulation parameters during training so the policy becomes robust to real-world variation:

| Parameter | Randomization Range | Example |
|---|---|---|
| Friction | 0.3 - 1.5 | Floor surfaces |
| Mass | ±30% | Object weights |
| Sensor noise | Gaussian σ=0.01-0.1 | Camera, IMU |
| Lighting | Random direction, intensity | Visual policies |
| Actuator delay | 0-50ms | Motor response |
| Joint damping | ±20% | Robot dynamics |

## System Identification

Instead of randomizing everything, measure real-world parameters and tune the simulator:

1. Collect trajectories on real robot
2. Optimize simulator parameters to match
3. Train policy in tuned simulator
4. Validate on real robot

## Progressive Deployment

A staged approach from simulation to reality:

1. **Pure simulation**: train and evaluate
2. **Sim-with-noise**: add realistic noise models
3. **Simplified real**: controlled lab environment
4. **Full deployment**: real-world conditions

## Techniques Comparison

| Method | Pros | Cons |
|---|---|---|
| Domain randomization | Simple, scalable | May be overly conservative |
| System identification | Accurate simulation | Expensive to measure |
| Progressive nets | Transfers features | Complex architecture |
| RCAN (Randomized-to-Canonical) | Adapts visual observations | Needs paired data |
| Real-world fine-tuning | Closes remaining gap | Requires safe exploration |

## Best Practices

- Start with domain randomization — it works surprisingly well
- Use an asymmetric actor-critic: critic sees privileged simulation info
- Add action smoothing to reduce jittery behavior on real hardware
- Test with increasing difficulty: flat ground, slopes, obstacles`,
          keyTakeaways: [
            'Simulation is cheaper and safer but does not perfectly match reality',
            'Domain randomization varies simulation parameters so policies generalize',
            'System identification tunes simulation to match the real robot',
            'Progressive deployment reduces risk: sim, noisy sim, lab, real world',
            'Asymmetric actor-critic is a key technique for sim-to-real'
          ],
          videos: [
            { id: 'str-1', title: 'PACE: Systematic Sim-to-Real Transfer', channel: 'Research', url: 'https://www.youtube.com/watch?v=kNf-uQb9k50', description: 'September 2025 presentation on systematic sim-to-real for diverse legged robots.' },
            { id: 'str-2', title: 'How Does Sim-to-Real Transfer Work?', channel: 'AI and ML Explained', url: 'https://www.youtube.com/watch?v=tkJxydr4nHI', description: 'Explainer on how robots learn tasks safely in simulation before real-world deployment.' },
            { id: 'str-3', title: 'Isaac Sim & Isaac Lab: Full Guide', channel: 'NVIDIA Community', url: 'https://www.youtube.com/watch?v=tQziqSx-F80', description: 'Complete guide to NVIDIA Isaac Sim and Isaac Lab for robot simulation and training.' },
            { id: 'str-4', title: 'Sim-to-Real with Dynamics Randomization', channel: 'Research', url: 'https://www.youtube.com/watch?v=XUW0cnvqbwM', description: 'Foundational ICRA paper demo on dynamics randomization for robotic control.' }
          ]
        },
        {
          id: 'foundation-models',
          title: 'Foundation Models & Imitation Learning',
          description: 'Modern approaches: vision-language-action models, learning from demonstrations, and generalist robot policies.',
          difficulty: 'advanced',
          estimatedTime: '5-6 hours',
          content: `# Foundation Models & Imitation Learning

## Imitation Learning

Instead of defining reward functions, learn directly from expert demonstrations.

### Behavioral Cloning (BC)

Supervised learning on expert state-action pairs:

\\\`\\\`\\\`
Dataset: {(s₁, a₁), (s₂, a₂), ..., (sₙ, aₙ)}
Train: π(s) = argmin Σ L(π(sᵢ), aᵢ)
\\\`\\\`\\\`

**Pros**: simple, no environment interaction needed
**Cons**: distribution shift — small errors compound over time

### DAgger (Dataset Aggregation)

Fixes distribution shift by iterating:

1. Train policy on expert data
2. Run policy, collect new states
3. Query expert for correct actions at those states
4. Aggregate datasets, repeat

### Learning from Play

Collect unstructured play data (human teleoperating a robot doing random tasks). Label retroactively with goals. Scales better than structured demonstrations.

## Vision-Language-Action (VLA) Models

The frontier of robot learning: models that take visual observations and language instructions, and output robot actions.

| Model | Organization | Key Feature |
|---|---|---|
| RT-2 | Google DeepMind | Fuses vision-language model with robot actions |
| Octo | UC Berkeley | Open-source, generalizes across robots |
| OpenVLA | Stanford/TRI | Open-source VLA model, fine-tunable |
| GR00T | NVIDIA | Humanoid foundation model |
| π₀ (Pi-Zero) | Physical Intelligence | Cross-embodiment, dexterous manipulation |

## Data Collection Pipeline

1. **Teleoperation**: human controls robot via VR controller, SpaceMouse, or leader-follower arms
2. **Data recording**: RGB images, joint states, end-effector poses, gripper state
3. **Quality filtering**: remove failed or noisy demonstrations
4. **Augmentation**: crop, color jitter, viewpoint variation
5. **Training**: typically transformer architecture, predict action chunks

## Key Concepts

- **Action chunking**: predict sequences of future actions (not one step at a time)
- **Diffusion policy**: model action distribution with denoising diffusion
- **Cross-embodiment**: train on data from different robots, transfer to new ones
- **Language conditioning**: "pick up the red cup and place it on the shelf"

## Challenges

- **Data collection is expensive**: each task needs hundreds of demonstrations
- **Generalization**: trained tasks may not transfer to new objects or environments
- **Safety**: learned policies can fail unpredictably
- **Evaluation**: no standardized benchmarks across the field`,
          keyTakeaways: [
            'Imitation learning trains robots from expert demonstrations instead of reward signals',
            'Behavioral cloning is simple but suffers from distribution shift',
            'VLA models combine vision, language, and motor control in one model',
            'Foundation models like RT-2, Octo, and GR00T aim for generalist robot policies',
            'Data quality and quantity are the main bottlenecks for imitation learning'
          ],
          videos: [
            { id: 'fm-1', title: 'Bridging Sim-to-Real Gap for Robot Training', channel: 'Research', url: 'https://www.youtube.com/watch?v=tudMMCq04SA', description: 'Using simulation to reduce real-world data needs for navigation policies.' }
          ]
        }
      ]
    }
  ]
};
