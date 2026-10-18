import { LearningPath } from '@/types';

export const ros2Path: LearningPath = {
  id: 'ros2',
  title: 'ROS2 & Robot Operating System',
  slug: 'ros2',
  description: 'Master ROS2 from fundamentals to building autonomous robots. Learn nodes, topics, services, actions, navigation, SLAM, and simulation.',
  longDescription: 'This comprehensive learning path takes you from zero to building fully autonomous robots using ROS2. You will learn the fundamental architecture, how to create and manage nodes, communicate through topics, services, and actions, simulate robots in Gazebo, implement SLAM and navigation, and work with robot perception. By the end, you will be able to design, simulate, and deploy your own robots.',
  icon: 'Bot',
  color: '#3B82F6',
  gradient: 'from-blue-500 to-cyan-500',
  prerequisites: ['Basic Python programming', 'Basic Linux terminal usage', 'Understanding of basic math concepts'],
  estimatedDuration: '12-16 weeks',
  difficulty: 'Beginner to Advanced',
  tags: ['ROS2', 'Robotics', 'Autonomous Systems', 'Simulation', 'Navigation', 'SLAM'],
  topics: [
    {
      id: 'ros2-intro',
      title: 'Introduction to ROS2',
      description: 'Understand what ROS2 is, its architecture, and why it is the standard for robotics development.',
      icon: 'BookOpen',
      order: 1,
      subtopics: [
        {
          id: 'what-is-ros2',
          title: 'What is ROS2?',
          description: 'Understanding the Robot Operating System 2 and its role in modern robotics.',
          difficulty: 'beginner',
          estimatedTime: '2-3 hours',
          content: `# What is ROS2?

ROS2 (Robot Operating System 2) is not actually an operating system — it's a flexible framework and set of tools for writing robot software. It provides hardware abstraction, low-level device control, commonly-used functionality, message-passing between processes, and package management.

## Why ROS2?

ROS2 was built to address the limitations of ROS1:

- **Real-time support**: ROS2 can work with real-time systems
- **Multi-platform**: Works on Linux, Windows, and macOS
- **Multi-robot support**: Built-in support for multi-robot systems
- **Security**: Built-in security features with DDS
- **Production-ready**: Designed for commercial and industrial use

## Architecture Overview

ROS2 uses DDS (Data Distribution Service) as its default middleware, which provides:
- Publish/Subscribe communication
- Service/Client communication
- Action-based communication
- Quality of Service (QoS) policies

> **Zenoh Middleware:** As of Kilted Kaiju (May 2025), Eclipse Zenoh is a **Tier 1 middleware** alternative via \`rmw_zenoh_cpp\`. Zenoh works in non-multicast environments (5G, cloud, VPN) where DDS can struggle. Set \`RMW_IMPLEMENTATION=rmw_zenoh_cpp\` to switch.

## Key Concepts

1. **Nodes**: Independent processes that perform computation
2. **Topics**: Named buses for message passing (pub/sub)
3. **Services**: Request/Reply communication pattern
4. **Actions**: Long-running tasks with feedback
5. **Parameters**: Configuration values for nodes
6. **Launch files**: Scripts to start multiple nodes

## ROS2 Distributions

| Distribution | Release Date | EOL | Target Platform |
|---|---|---|---|
| Humble Hawksbill | May 2022 | May 2027 | Ubuntu 22.04 |
| Jazzy Jalisco | May 2024 | May 2029 | Ubuntu 24.04 |
| Kilted Kaiju | May 2025 | Nov 2026 | Ubuntu 24.04 |
| Lyrical Luth | May 2026 | May 2031 | Ubuntu 26.04 |
| Rolling | Continuous | N/A | Latest Ubuntu |

> **Kilted Kaiju** is the first release with Zenoh as a Tier 1 middleware option. **Lyrical Luth** is the newest LTS release, supported until May 2031.`,
          keyTakeaways: [
            'ROS2 is a framework for building robot software, not an actual operating system',
            'It uses DDS middleware for reliable communication',
            'Key concepts: Nodes, Topics, Services, Actions, Parameters',
            'ROS2 supports real-time systems and is production-ready',
            'Choose a LTS distribution like Humble or Jazzy for stability'
          ],
          videos: [
            { id: 'ros2-intro-1', title: 'ROS2 for Beginners - What is ROS2?', channel: 'Articulated Robotics', url: 'https://www.youtube.com/watch?v=Gg25GfA456o', description: 'Excellent beginner-friendly introduction to ROS2.' },
            { id: 'ros2-intro-2', title: 'ROS2 Humble Complete Course', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=0aPbWsyENA8', description: 'Comprehensive full course on ROS2 Humble covering all fundamentals.' },
            { id: 'ros2-intro-3', title: 'Learn ROS2 Beginner to Advanced', channel: 'Kevin Wood', url: 'https://www.youtube.com/watch?v=HJAE5Pk8Nyw', description: '2.5-hour complete crash course from zero to writing ROS2 apps.' },
            { id: 'ros2-intro-4', title: 'Learn ROS2 Jazzy Crash Course 2025', channel: 'ROS2 Tutorials', url: 'https://www.youtube.com/watch?v=Se5pvRlTX8s', description: 'Short crash course covering ROS2 Jazzy basics with full learning material and code included.' },
            { id: 'ros2-intro-5', title: 'Learn ROS2 in 1 Hour', channel: 'ROS2 Tutorials', url: 'https://www.youtube.com/watch?v=0trcdQh0F7I', description: 'Quick-start Python-based ROS2 tutorial covering current ROS2 workflow.' }
          ]
        },
        {
          id: 'ros2-installation',
          title: 'Installing ROS2',
          description: 'Step-by-step guide to installing ROS2 on Ubuntu.',
          difficulty: 'beginner',
          estimatedTime: '1-2 hours',
          content: `# Installing ROS2

## Prerequisites
- Ubuntu 22.04 (for Humble) or Ubuntu 24.04 (for Jazzy)
- At least 4GB RAM (8GB recommended)
- 20GB free disk space

## Installation Steps (Ubuntu 22.04 - Humble)

### 1. Set up locale
\`\`\`bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
\`\`\`

### 2. Setup Sources
\`\`\`bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
\`\`\`

### 3. Install ROS2
\`\`\`bash
sudo apt update && sudo apt upgrade
sudo apt install ros-humble-desktop
\`\`\`

### 4. Environment Setup
\`\`\`bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
\`\`\`

### 5. Install Build Tools
\`\`\`bash
sudo apt install python3-colcon-common-extensions python3-rosdep
sudo rosdep init
rosdep update
\`\`\`

### 6. Verify Installation
\`\`\`bash
ros2 run demo_nodes_cpp talker
# In another terminal:
ros2 run demo_nodes_cpp listener
\`\`\``,
          keyTakeaways: [
            'ROS2 Humble requires Ubuntu 22.04, Jazzy requires Ubuntu 24.04',
            'Always source the ROS2 setup.bash in your bashrc',
            'Install colcon for building ROS2 packages',
            'Verify installation with the talker/listener demo'
          ],
          videos: [
            { id: 'ros2-install-1', title: 'Install ROS2 Humble on Ubuntu 22.04', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=0aPbWsyENA8&t=300', description: 'Step-by-step ROS2 Humble installation guide.' },
            { id: 'ros2-install-2', title: 'Getting Ready to Build Robots with ROS', channel: 'Articulated Robotics', url: 'https://www.youtube.com/playlist?list=PLunhqkrRNRhYYCaSTVP-qJnyUPkTxJnBt', description: 'Linux setup, SSH, Git, and ROS2 workspace preparation.' },
            { id: 'ros2-install-jazzy-1', title: 'Install ROS2 Jazzy Jalisco - 2025 Tutorial', channel: 'ROS2 Tutorials', url: 'https://www.youtube.com/watch?v=aQeirEM59zg', description: 'Step-by-step ROS2 Jazzy installation on Ubuntu 24.04.' },
            { id: 'ros2-install-kilted-1', title: 'How to Install ROS 2 Kilted Kaiju on Windows 10/11', channel: 'ROS2 Tutorials', url: 'https://www.youtube.com/watch?v=xSXrRQGWmbQ', description: 'First Kilted Kaiju installation guide, covers Windows setup step by step.' }
          ]
        },
        {
          id: 'ros2-workspace',
          title: 'ROS2 Workspace & Packages',
          description: 'Learn to create and manage ROS2 workspaces and packages.',
          difficulty: 'beginner',
          estimatedTime: '2-3 hours',
          content: `# ROS2 Workspace & Packages

## Creating a Workspace

\`\`\`
ros2_ws/
├── build/      # Build artifacts
├── install/    # Installed packages
├── log/        # Build logs
└── src/        # Source packages
\`\`\`

### Create Your Workspace
\`\`\`bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build
source install/setup.bash
\`\`\`

## Creating Packages

### Python Package
\`\`\`bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_python_pkg --dependencies rclpy
\`\`\`

### C++ Package
\`\`\`bash
ros2 pkg create --build-type ament_cmake my_cpp_pkg --dependencies rclcpp
\`\`\`

## Building & Sourcing
\`\`\`bash
cd ~/ros2_ws
colcon build                          # Build all
colcon build --packages-select my_pkg # Build specific
source install/setup.bash             # Source workspace
\`\`\``,
          keyTakeaways: [
            'Workspaces contain src/, build/, install/, and log/ directories',
            'Use colcon build to compile packages',
            'Always source install/setup.bash after building',
            'Packages can be Python (ament_python) or C++ (ament_cmake)'
          ],
          videos: [
            { id: 'ros2-ws-1', title: 'ROS2 Workspaces and Packages', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=7yjvSJm3OwA', description: 'Create and manage ROS2 workspaces and packages.' },
            { id: 'ros2-ws-jazzy-1', title: 'ROS2 Jazzy: First Python Program from Scratch', channel: 'Aleksandar Haber', url: 'https://www.youtube.com/watch?v=R9H24AOjA24', description: 'Jazzy-targeted workspace setup and first Python program tutorial.' }
          ]
        }
      ]
    },
    {
      id: 'ros2-core',
      title: 'ROS2 Core Concepts',
      description: 'Master nodes, topics, services, actions, and communication patterns.',
      icon: 'Network',
      order: 2,
      subtopics: [
        {
          id: 'ros2-nodes',
          title: 'Nodes & Executors',
          description: 'ROS2 nodes — the fundamental building blocks of any robotic system.',
          difficulty: 'beginner',
          estimatedTime: '3-4 hours',
          content: `# ROS2 Nodes & Executors

## What is a Node?

A node is a fundamental building block in ROS2. Each node should be responsible for a single, modular purpose.

## Creating a Python Node

\`\`\`python
import rclpy
from rclpy.node import Node

class MyNode(Node):
    def __init__(self):
        super().__init__('my_node')
        self.get_logger().info('Hello from my_node!')
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.counter = 0

    def timer_callback(self):
        self.counter += 1
        self.get_logger().info(f'Timer callback #{self.counter}')

def main(args=None):
    rclpy.init(args=args)
    node = MyNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
\`\`\`

## Creating a C++ Node

\`\`\`cpp
#include "rclcpp/rclcpp.hpp"

class MyNode : public rclcpp::Node {
public:
    MyNode() : Node("my_node") {
        RCLCPP_INFO(this->get_logger(), "Hello from my_node!");
        timer_ = this->create_wall_timer(
            std::chrono::seconds(1),
            std::bind(&MyNode::timer_callback, this));
    }
private:
    void timer_callback() {
        RCLCPP_INFO(this->get_logger(), "Timer callback");
    }
    rclcpp::TimerBase::SharedPtr timer_;
};

int main(int argc, char **argv) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<MyNode>());
    rclcpp::shutdown();
    return 0;
}
\`\`\`

## Executors
- **SingleThreadedExecutor**: All callbacks in one thread
- **MultiThreadedExecutor**: Thread pool for parallel execution`,
          keyTakeaways: [
            'Nodes are single-purpose processes in ROS2',
            'Each node has a unique name within the system',
            'Nodes can be written in Python (rclpy) or C++ (rclcpp)',
            'Executors control how callbacks are processed'
          ],
          videos: [
            { id: 'ros2-nodes-1', title: 'ROS2 Nodes - Creating Your First Node', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=YUPBmg9-0Qs', description: 'Create and run your first ROS2 node in Python and C++.' },
            { id: 'ros2-nodes-2', title: 'Understanding ROS2 Nodes', channel: 'Articulated Robotics', url: 'https://www.youtube.com/watch?v=sKmeK6HZzDQ', description: 'How ROS2 nodes work and how to structure robot software.' }
          ]
        },
        {
          id: 'ros2-topics',
          title: 'Topics & Messages',
          description: 'Publish/subscribe communication for streaming data between nodes.',
          difficulty: 'beginner',
          estimatedTime: '3-4 hours',
          content: `# ROS2 Topics & Messages

Topics use a publish/subscribe model. Publishers send data to a topic, subscribers receive it.

## Common Message Types
\`\`\`
geometry_msgs/msg/Twist        # Velocity commands
geometry_msgs/msg/Pose         # Position + Orientation
sensor_msgs/msg/LaserScan      # Lidar data
sensor_msgs/msg/Image          # Camera images
sensor_msgs/msg/Imu            # IMU data
\`\`\`

## Publisher Example (Python)
\`\`\`python
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.i += 1
\`\`\`

## Subscriber Example (Python)
\`\`\`python
class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String, 'topic', self.listener_callback, 10)

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')
\`\`\`

## Quality of Service (QoS)
| Profile | Reliability | Use Case |
|---|---|---|
| Default | Reliable | General purpose |
| Sensor Data | Best Effort | Sensor streams |
| Services | Reliable | Request/Reply |

## CLI Tools
\`\`\`bash
ros2 topic list              # List all topics
ros2 topic echo /topic       # Print messages
ros2 topic pub /topic std_msgs/msg/String "data: 'hello'"
ros2 topic hz /topic         # Message frequency
\`\`\``,
          keyTakeaways: [
            'Topics use publish/subscribe for asynchronous data streaming',
            'Messages are strongly typed data structures',
            'QoS profiles control reliability and durability',
            'Use ros2 topic CLI tools for debugging'
          ],
          videos: [
            { id: 'ros2-topics-1', title: 'ROS2 Topics - Publishers and Subscribers', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=4MpfDs1P04I', description: 'Complete tutorial on ROS2 topics with hands-on examples.' }
          ]
        },
        {
          id: 'ros2-services-actions',
          title: 'Services & Actions',
          description: 'Request/reply services and long-running action patterns.',
          difficulty: 'intermediate',
          estimatedTime: '3-4 hours',
          content: `# ROS2 Services & Actions

## Services (Request/Reply)

### Service Server
\`\`\`python
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.callback)

    def callback(self, request, response):
        response.sum = request.a + request.b
        return response
\`\`\`

## Actions (Long-Running Tasks)
Actions handle tasks that need feedback and can be canceled.

| Pattern | Use Case | Example |
|---|---|---|
| Topic | Streaming data | Sensor readings |
| Service | Quick request/reply | Get map data |
| Action | Long task + feedback | Navigate to goal |`,
          keyTakeaways: [
            'Services are synchronous request/reply',
            'Actions handle long-running tasks with feedback and cancellation',
            'Use topics for streaming, services for queries, actions for tasks'
          ],
          videos: [
            { id: 'ros2-srv-1', title: 'ROS2 Services Explained', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=2MFQMmSHaFk', description: 'ROS2 services with practical implementations.' },
            { id: 'ros2-act-1', title: 'ROS2 Actions Tutorial', channel: 'The Construct', url: 'https://www.youtube.com/watch?v=HPq8N3SmBnA', description: 'ROS2 actions for long-running tasks with feedback.' }
          ]
        },
        {
          id: 'ros2-lifecycle',
          title: 'Lifecycle (Managed) Nodes',
          description: 'Control node startup, shutdown, and error recovery with deterministic state machines.',
          difficulty: 'intermediate',
          estimatedTime: '2-3 hours',
          content: `# Lifecycle (Managed) Nodes

Lifecycle nodes provide a deterministic state machine for controlling node startup, shutdown, and error recovery. They are essential for production ROS2 systems — Nav2 uses lifecycle nodes to manage its entire navigation stack.

## Why Lifecycle Nodes?

Regular ROS2 nodes start processing immediately. In complex systems this causes problems:
- A sensor driver might publish before calibration finishes
- A planner might request a map before the map server loads it
- Crash recovery requires restarting the entire system

Lifecycle nodes solve this by separating **configuration** from **execution**.

## States

A lifecycle node moves through four primary states:

| State | Description |
|---|---|
| **Unconfigured** | Node is created but not set up. No resources allocated. |
| **Inactive** | Configured and ready, but not processing. Subscriptions paused. |
| **Active** | Fully running, processing callbacks and publishing. |
| **Finalized** | Node is shutting down. Terminal state. |

There are also transitioning states: **Configuring**, **Activating**, **Deactivating**, **CleaningUp**, **ShuttingDown**, and **ErrorProcessing** that exist during transitions.

## Transitions

\`\`\`
Unconfigured --[configure]--> Inactive
Inactive     --[activate]---> Active
Active       --[deactivate]-> Inactive
Inactive     --[cleanup]----> Unconfigured
Any          --[shutdown]---> Finalized
Any          --[error]------> ErrorProcessing --> Unconfigured (or Finalized)
\`\`\`

## Python Example

\`\`\`python
import rclpy
from rclpy.lifecycle import Node as LifecycleNode
from rclpy.lifecycle import State, TransitionCallbackReturn
from std_msgs.msg import String

class ManagedTalker(LifecycleNode):
    def __init__(self):
        super().__init__('managed_talker')
        self.publisher_ = None
        self.timer_ = None
        self.get_logger().info('Node created in Unconfigured state')

    def on_configure(self, state: State) -> TransitionCallbackReturn:
        """Allocate resources, set up publisher."""
        self.publisher_ = self.create_lifecycle_publisher(String, 'chatter', 10)
        self.get_logger().info('Configured: publisher created')
        return TransitionCallbackReturn.SUCCESS

    def on_activate(self, state: State) -> TransitionCallbackReturn:
        """Start publishing."""
        self.timer_ = self.create_timer(1.0, self.publish_message)
        self.get_logger().info('Activated: timer started')
        return super().on_activate(state)

    def on_deactivate(self, state: State) -> TransitionCallbackReturn:
        """Stop publishing but keep resources."""
        if self.timer_:
            self.timer_.cancel()
        self.get_logger().info('Deactivated: timer stopped')
        return super().on_deactivate(state)

    def on_cleanup(self, state: State) -> TransitionCallbackReturn:
        """Release all resources."""
        self.publisher_ = None
        self.timer_ = None
        self.get_logger().info('Cleaned up: resources released')
        return TransitionCallbackReturn.SUCCESS

    def on_shutdown(self, state: State) -> TransitionCallbackReturn:
        """Final cleanup before destruction."""
        self.get_logger().info('Shutting down')
        return TransitionCallbackReturn.SUCCESS

    def publish_message(self):
        msg = String()
        msg.data = 'Hello from managed node'
        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    node = ManagedTalker()
    rclpy.spin(node)
    rclpy.shutdown()
\`\`\`

## CLI Commands

\`\`\`bash
# List lifecycle nodes
ros2 lifecycle nodes

# Get current state
ros2 lifecycle get /managed_talker

# Trigger transitions
ros2 lifecycle set /managed_talker configure
ros2 lifecycle set /managed_talker activate
ros2 lifecycle set /managed_talker deactivate
ros2 lifecycle set /managed_talker cleanup
ros2 lifecycle set /managed_talker shutdown

# List available transitions from current state
ros2 lifecycle list /managed_talker
\`\`\`

## Use Cases

- **Hardware drivers**: Configure serial ports before activating
- **Navigation stack**: Nav2 uses lifecycle to start all nodes in order
- **Sensor pipelines**: Ensure calibration before publishing
- **Multi-robot**: Coordinate startup across robots

## Package Dependencies

\`\`\`xml
<!-- package.xml -->
<depend>rclpy</depend>
<depend>lifecycle_msgs</depend>
<depend>rclpy_lifecycle</depend>
\`\`\``,
          keyTakeaways: [
            'Lifecycle nodes provide deterministic startup and shutdown sequences',
            'States: Unconfigured -> Inactive -> Active -> Finalized',
            'Nav2 uses lifecycle nodes to manage its entire navigation stack',
            'Useful for hardware drivers that need initialization before use'
          ],
          videos: [
            { id: 'lifecycle-1', title: 'Understanding ROS2 Managed Nodes in Practice', channel: 'The Construct', url: 'https://app.theconstruct.ai/open-classes/5daaccbd-f9f9-4631-a7d4-ec58dd147403', description: 'Free open class: hands-on lifecycle nodes with a Neobotix MP-400 robot.' }
          ]
        }
      ]
    },
    {
      id: 'ros2-tools',
      title: 'ROS2 Tools & Visualization',
      description: 'Master RViz2, tf2, URDF, and launch files.',
      icon: 'Wrench',
      order: 3,
      subtopics: [
        {
          id: 'ros2-launch',
          title: 'Launch Files',
          description: 'Automate starting multiple nodes with configurable launch files.',
          difficulty: 'intermediate',
          estimatedTime: '2-3 hours',
          content: `# ROS2 Launch Files

\`\`\`python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(package='turtlesim', executable='turtlesim_node', name='sim'),
        Node(package='turtlesim', executable='turtle_teleop_key', name='teleop'),
    ])
\`\`\`

Run: \`ros2 launch my_package my_launch.py\``,
          keyTakeaways: [
            'Launch files start multiple nodes with one command',
            'Use Python for complex launch file logic',
            'Launch arguments make configurations flexible'
          ],
          videos: [
            { id: 'ros2-launch-1', title: 'ROS2 Launch Files Tutorial', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=PqNGicw1fiM', description: 'Guide to creating and using ROS2 launch files.' }
          ]
        },
        {
          id: 'ros2-rviz-urdf',
          title: 'RViz2, URDF & tf2',
          description: 'Visualize robot state, create robot descriptions, and manage transforms.',
          difficulty: 'intermediate',
          estimatedTime: '3-4 hours',
          content: `# RViz2, URDF & tf2

## URDF (Unified Robot Description Format)
\`\`\`xml
<robot name="my_robot">
  <link name="base_link">
    <visual>
      <geometry><box size="0.3 0.2 0.1"/></geometry>
    </visual>
  </link>
  <joint name="wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="wheel_link"/>
    <origin xyz="0.1 0.1 -0.05"/>
    <axis xyz="0 0 1"/>
  </joint>
</robot>
\`\`\`

## tf2 - Transform Library
\`\`\`bash
ros2 run tf2_tools view_frames       # Generate frame tree
ros2 run tf2_ros tf2_echo base_link odom  # Print transform
\`\`\``,
          keyTakeaways: [
            'RViz2 is essential for debugging and visualizing robot data',
            'URDF describes the robot physical structure',
            'tf2 manages coordinate frame transformations'
          ],
          videos: [
            { id: 'ros2-urdf-1', title: 'URDF and RViz2 Tutorial', channel: 'Articulated Robotics', url: 'https://www.youtube.com/watch?v=BcjHyhV0kIs', description: 'Create robot descriptions with URDF and visualize in RViz2.' },
            { id: 'ros2-urdf-2', title: 'How Do We Describe a Robot? With URDF!', channel: 'Articulated Robotics', url: 'https://www.youtube.com/watch?v=kYJzhjnsfMg', description: 'Master URDF and Xacro for robot modeling.' }
          ]
        },
        {
          id: 'micro-ros',
          title: 'micro-ROS: ROS2 on Microcontrollers',
          description: 'Run ROS2 nodes on ESP32, STM32, and other MCUs using micro-ROS.',
          difficulty: 'intermediate',
          estimatedTime: '4-5 hours',
          content: `# micro-ROS: ROS2 on Microcontrollers

micro-ROS brings the ROS2 communication stack to resource-constrained microcontrollers. It enables MCUs like ESP32 and STM32 to participate as first-class nodes in a ROS2 graph — publishing, subscribing, and using services just like any other node.

## Architecture

\`\`\`
+--------------------+     Transport      +--------------------+
|   Microcontroller  |  (Serial/WiFi/USB) |   Host Computer    |
|                    | <----------------> |                    |
|  micro-ROS Client  |                    |  micro-ROS Agent   |
|  (rcl + rclc)      |                    |  (bridges to DDS)  |
|  on RTOS           |                    |  on ROS2           |
+--------------------+                    +--------------------+
                                                |
                                          +-----v-----+
                                          | ROS2 Graph |
                                          | (other     |
                                          |  nodes)    |
                                          +-----------+
\`\`\`

The micro-ROS client runs on the MCU with a lightweight RTOS. It communicates through a **micro-ROS agent** running on a host computer, which bridges messages into the standard ROS2 DDS network.

## Supported RTOS

| RTOS | Boards | Notes |
|---|---|---|
| FreeRTOS | ESP32, STM32, Teensy | Most common choice for hobbyists |
| Zephyr | STM32, nRF52, various | Good for production, strong driver support |
| NuttX | STM32, various | POSIX-like, used in PX4 autopilot |
| Arduino | ESP32, Portenta, Pico | Easiest to get started with |

## Supported Boards

- **ESP32** / ESP32-S3: WiFi + Bluetooth, most popular for hobbyists
- **STM32** (F4, F7, H7 series): Industrial-grade, real-time capable
- **Raspberry Pi Pico** (RP2040): Low cost, USB transport
- **Teensy 4.x**: High performance, Arduino-compatible
- **Arduino Portenta H7**: Dual-core, WiFi, industrial IoT

## Transport Layers

| Transport | Speed | Use Case |
|---|---|---|
| Serial (UART) | Moderate | Wired, most reliable |
| USB CDC | Fast | Development, tethered robots |
| WiFi (UDP) | Variable | Wireless, untethered robots |
| Ethernet | Fast | Industrial, deterministic |

## Setting Up the micro-ROS Agent

The agent runs on your host computer (the one running ROS2):

\`\`\`bash
# Install the agent (Jazzy)
sudo apt install ros-jazzy-micro-ros-agent

# Or build from source
mkdir -p ~/microros_ws/src
cd ~/microros_ws/src
git clone -b jazzy https://github.com/micro-ROS/micro-ROS-Agent.git
cd ~/microros_ws
colcon build
source install/setup.bash

# Run the agent (serial transport)
ros2 run micro_ros_agent micro_ros_agent serial --dev /dev/ttyUSB0

# Run the agent (WiFi/UDP transport)
ros2 run micro_ros_agent micro_ros_agent udp4 --port 8888
\`\`\`

## Publisher Example (Arduino/ESP32)

\`\`\`cpp
#include <micro_ros_arduino.h>
#include <rcl/rcl.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>
#include <std_msgs/msg/int32.h>

rcl_publisher_t publisher;
std_msgs__msg__Int32 msg;
rclc_executor_t executor;
rclc_support_t support;
rcl_allocator_t allocator;
rcl_node_t node;
rcl_timer_t timer;

void timer_callback(rcl_timer_t *timer, int64_t last_call_time) {
  msg.data++;
  rcl_publish(&publisher, &msg, NULL);
}

void setup() {
  // WiFi transport (for ESP32)
  set_microros_wifi_transports("MySSID", "MyPassword", "192.168.1.100", 8888);

  // Or serial transport
  // set_microros_transports();

  allocator = rcl_get_default_allocator();
  rclc_support_init(&support, 0, NULL, &allocator);

  rclc_node_init_default(&node, "micro_ros_esp32", "", &support);

  rclc_publisher_init_default(
    &publisher, &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
    "micro_ros_count");

  rclc_timer_init_default(&timer, &support, RCL_MS_TO_NS(1000), timer_callback);
  rclc_executor_init(&executor, &support.context, 1, &allocator);
  rclc_executor_add_timer(&executor, &timer);

  msg.data = 0;
}

void loop() {
  rclc_executor_spin_some(&executor, RCL_MS_TO_NS(100));
}
\`\`\`

## Development Workflow

1. **Install micro_ros_setup** or use the Arduino library
2. **Flash firmware** to the MCU with your node code
3. **Start the micro-ROS agent** on the host
4. **Verify** with \`ros2 topic list\` — your MCU topics appear in the graph
5. **Interact** using standard ROS2 tools (\`ros2 topic echo\`, RViz2, etc.)

## When to Use micro-ROS

- **Direct sensor reading**: IMU, encoders, ultrasonic on MCU pins
- **Motor control**: Real-time PWM from a dedicated MCU
- **Edge processing**: Offload time-critical loops from the main computer
- **Cost-sensitive**: ESP32 costs a few dollars vs. a Raspberry Pi`,
          keyTakeaways: [
            'micro-ROS brings ROS2 communication to microcontrollers',
            'Runs on FreeRTOS, Zephyr, or NuttX',
            'Requires a micro-ROS agent running on a host computer',
            'Supports serial, WiFi, and USB transport to the host'
          ],
          videos: [
            { id: 'micro-ros-1', title: 'Intro to ROS Part 12: Talking to Microcontrollers', channel: 'Shawn Hymel / DigiKey', url: 'https://www.digikey.com/en/maker/tutorials/2025/intro-to-ros-part-12-talking-to-microcontrollers', description: 'Connect a Raspberry Pi running ROS2 to an Arduino-compatible MCU. Dec 2025. Code and Docker image on GitHub.' }
          ]
        }
      ]
    },
    {
      id: 'ros2-simulation',
      title: 'Robot Simulation',
      description: 'Simulate robots in Gazebo with realistic physics and sensors.',
      icon: 'Monitor',
      order: 4,
      subtopics: [
        {
          id: 'gazebo-sim',
          title: 'Gazebo Simulation',
          description: 'Set up and use Gazebo for realistic robot simulation.',
          difficulty: 'intermediate',
          estimatedTime: '4-5 hours',
          content: `# Gazebo Simulation

## Installing Gazebo
\`\`\`bash
sudo apt install ros-humble-gazebo-ros-pkgs
\`\`\`

## Adding Sensors in Gazebo
\`\`\`xml
<gazebo reference="lidar_link">
  <sensor name="lidar" type="ray">
    <ray>
      <scan>
        <horizontal>
          <samples>360</samples>
          <min_angle>-3.14159</min_angle>
          <max_angle>3.14159</max_angle>
        </horizontal>
      </scan>
      <range><min>0.1</min><max>10.0</max></range>
    </ray>
    <plugin name="gazebo_ros_ray_sensor" filename="libgazebo_ros_ray_sensor.so">
      <ros><remapping>~/out:=scan</remapping></ros>
      <output_type>sensor_msgs/LaserScan</output_type>
    </plugin>
  </sensor>
</gazebo>
\`\`\``,
          keyTakeaways: [
            'Gazebo provides realistic physics and sensor simulation',
            'Use Gazebo plugins to connect simulated sensors to ROS2 topics',
            'Test algorithms safely in simulation before deploying to real hardware'
          ],
          videos: [
            { id: 'gz-1', title: 'Gazebo Simulation for ROS2', channel: 'Articulated Robotics', url: 'https://www.youtube.com/watch?v=laWn7_cj434', description: 'Complete guide to simulating robots in Gazebo with ROS2.' },
            { id: 'gz-2', title: 'Build a Mobile Robot with ROS2', channel: 'Articulated Robotics', url: 'https://www.youtube.com/playlist?list=PLunhqkrRNRhYAffV8JDiFOatQXuU-NnxT', description: 'Full playlist: build and simulate a mobile robot from scratch.' },
            { id: 'gz-3', title: 'ros2_control Crash Course', channel: 'Robotics Back-End', url: 'https://www.youtube.com/watch?v=Gg25GfA456o', description: 'ros2_control framework for simulated and real hardware.' }
          ]
        }
      ]
    },
    {
      id: 'ros2-navigation',
      title: 'Navigation & SLAM',
      description: 'Implement autonomous navigation, mapping, and localization.',
      icon: 'Navigation',
      order: 5,
      subtopics: [
        {
          id: 'nav2',
          title: 'Nav2 Navigation Stack',
          description: 'Autonomous robot navigation with path planning and obstacle avoidance.',
          difficulty: 'advanced',
          estimatedTime: '5-6 hours',
          content: `# Nav2 - ROS2 Navigation Stack

## Install
\`\`\`bash
sudo apt install ros-humble-navigation2 ros-humble-nav2-bringup
\`\`\`

## Sending Navigation Goals
\`\`\`python
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator

navigator = BasicNavigator()
goal_pose = PoseStamped()
goal_pose.header.frame_id = 'map'
goal_pose.pose.position.x = 2.0
goal_pose.pose.position.y = 1.0
goal_pose.pose.orientation.w = 1.0
navigator.goToPose(goal_pose)

while not navigator.isTaskComplete():
    feedback = navigator.getFeedback()
    print(f'Distance remaining: {feedback.distance_remaining:.2f}')
\`\`\``,
          keyTakeaways: [
            'Nav2 provides complete autonomous navigation',
            'Behavior trees orchestrate complex navigation tasks',
            'Costmaps combine static maps with live sensor data',
            'The simple commander API makes sending goals easy'
          ],
          videos: [
            { id: 'nav2-1', title: 'Autonomous Navigation with Nav2', channel: 'Articulated Robotics', url: 'https://www.youtube.com/watch?v=jkoGkAd0GYk', description: 'Step-by-step Nav2 setup and navigation tutorial.' },
            { id: 'nav2-2', title: 'Robot Mapping / SLAM Course', channel: 'Cyrill Stachniss', url: 'https://www.youtube.com/playlist?list=PLgnQpQtFTOGQrZ4O5QzbIHgl3b1JHimN_', description: 'World-class academic SLAM course covering EKF, particle filters, graph-based SLAM.' }
          ]
        },
        {
          id: 'slam',
          title: 'SLAM',
          description: 'Build maps of unknown environments while tracking robot position.',
          difficulty: 'advanced',
          estimatedTime: '4-5 hours',
          content: `# SLAM in ROS2

\`\`\`bash
sudo apt install ros-humble-slam-toolbox
ros2 launch slam_toolbox online_async_launch.py
\`\`\`

## Types of SLAM
| Algorithm | Type | Best For |
|---|---|---|
| SLAM Toolbox | 2D Lidar | Indoor mapping |
| Cartographer | 2D/3D Lidar | Large-scale mapping |
| RTAB-Map | Visual + Lidar | 3D reconstruction |
| ORB-SLAM3 | Visual | Camera-only SLAM |

## Save/Load Maps
\`\`\`bash
ros2 run nav2_map_server map_saver_cli -f my_map
ros2 run nav2_map_server map_server --ros-args -p yaml_filename:=my_map.yaml
\`\`\``,
          keyTakeaways: [
            'SLAM simultaneously builds maps and tracks robot position',
            'SLAM Toolbox is the go-to 2D solution for ROS2',
            'Different algorithms suit different sensor setups'
          ],
          videos: [
            { id: 'slam-1', title: 'Mapping with SLAM Toolbox', channel: 'Articulated Robotics', url: 'https://www.youtube.com/watch?v=ZaiA3hWaRzE', description: 'SLAM Toolbox guide: mapping, loop closure, and localization.' }
          ]
        },
        {
          id: 'ros2-behavior-trees',
          title: 'Behavior Trees in Nav2',
          description: 'Customize robot navigation logic using behavior trees and BehaviorTree.CPP.',
          difficulty: 'advanced',
          estimatedTime: '4-5 hours',
          content: `# Behavior Trees in Nav2

## Why Behavior Trees?

Nav2 uses behavior trees (BTs) instead of finite state machines (FSMs) because:

- **Modularity**: each behavior is an independent node
- **Reactivity**: the tree is ticked at a fixed rate; priorities are re-evaluated every tick
- **Composability**: complex behaviors are built from simple building blocks
- **Readability**: tree structure is easier to understand than state transition diagrams

## BehaviorTree.CPP

Nav2 uses the BehaviorTree.CPP library. Core node types:

| Node Type | Symbol | Behavior |
|---|---|---|
| Sequence | → | Runs children left-to-right; fails if any child fails |
| Fallback | ? | Runs children left-to-right; succeeds if any child succeeds |
| Decorator | ◇ | Modifies child behavior (retry, invert, timeout) |
| Action | ■ | Leaf node that does work (call an action server) |
| Condition | ○ | Leaf node that checks a condition |

## Nav2 Default Behavior Tree

Nav2 ships with a default BT XML file. Key structure:

\\\`\\\`\\\`xml
<root main_tree_to_execute="MainTree">
  <BehaviorTree ID="MainTree">
    <RecoveryNode number_of_retries="6">
      <PipelineSequence>
        <RateController hz="1.0">
          <ComputePathToPose goal="{goal}" path="{path}"/>
        </RateController>
        <FollowPath path="{path}"/>
      </PipelineSequence>
      <SequenceStar>
        <ClearEntireCostmap name="ClearGlobalCostmap" service_name="/global_costmap/clear"/>
        <ClearEntireCostmap name="ClearLocalCostmap" service_name="/local_costmap/clear"/>
        <Spin spin_dist="1.57"/>
        <Wait wait_duration="5"/>
        <BackUp backup_dist="0.3" backup_speed="0.05"/>
      </SequenceStar>
    </RecoveryNode>
  </BehaviorTree>
</root>
\\\`\\\`\\\`

This tree: computes a path, follows it, and on failure tries recovery behaviors (clear costmaps, spin, wait, back up).

## Writing Custom BT Plugins

Create a new action node that calls a ROS2 action server:

\\\`\\\`\\\`cpp
#include "behaviortree_cpp/action_node.h"

class MyCustomAction : public BT::StatefulActionNode {
public:
  MyCustomAction(const std::string& name, const BT::NodeConfig& config)
    : BT::StatefulActionNode(name, config) {}

  static BT::PortsList providedPorts() {
    return { BT::InputPort<std::string>("target") };
  }

  BT::NodeStatus onStart() override {
    // Send goal to action server
    return BT::NodeStatus::RUNNING;
  }

  BT::NodeStatus onRunning() override {
    // Check if action completed
    if (action_done_) return BT::NodeStatus::SUCCESS;
    return BT::NodeStatus::RUNNING;
  }

  void onHalted() override {
    // Cancel action if tree is halted
  }
};
\\\`\\\`\\\`

Register in a plugin:
\\\`\\\`\\\`cpp
BT_REGISTER_NODES(factory) {
  factory.registerNodeType<MyCustomAction>("MyCustomAction");
}
\\\`\\\`\\\`

## Groot2 for Visual Editing

Groot2 is a graphical editor for behavior trees:

- Drag-and-drop tree construction
- Live monitoring of running trees
- Export/import BT XML files
- Available at: https://www.behaviortree.dev/groot

## Common Customizations

- **Custom recovery**: add domain-specific recovery behaviors
- **Task switching**: switch between different navigation modes
- **Dynamic replanning**: adjust behavior based on sensor data
- **Multi-goal navigation**: visit a sequence of waypoints`,
          keyTakeaways: [
            'Nav2 uses behavior trees to orchestrate navigation tasks',
            'BehaviorTree.CPP provides Sequence, Fallback, Decorator, Action, and Condition nodes',
            'Custom BT plugins let you add domain-specific navigation logic',
            'Groot2 provides visual editing and live monitoring of behavior trees',
            'The default Nav2 BT handles path planning, following, and recovery'
          ],
          videos: [
            { id: 'bt-ros-1', title: 'Behavior Trees for ROS2', channel: 'The Construct', url: 'https://www.youtube.com/watch?v=T8aPgljDAoE', description: 'Introduction to behavior trees and their use within ROS2 navigation.' }
          ]
        }
      ]
    },
    {
      id: 'ros2-perception',
      title: 'Robot Perception',
      description: 'Computer vision, object detection, and point cloud processing in ROS2.',
      icon: 'Eye',
      order: 6,
      subtopics: [
        {
          id: 'ros2-cv',
          title: 'Computer Vision with ROS2',
          description: 'Integrate OpenCV and deep learning for robot vision.',
          difficulty: 'advanced',
          estimatedTime: '4-5 hours',
          content: `# Computer Vision with ROS2

## cv_bridge - OpenCV Integration
\`\`\`python
import cv2
from cv_bridge import CvBridge
from sensor_msgs.msg import Image

class ImageProcessor(Node):
    def __init__(self):
        super().__init__('image_processor')
        self.bridge = CvBridge()
        self.subscription = self.create_subscription(
            Image, '/camera/image_raw', self.callback, 10)

    def callback(self, msg):
        cv_image = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)
\`\`\`

## Object Detection with YOLO
\`\`\`python
from ultralytics import YOLO

class ObjectDetector(Node):
    def __init__(self):
        super().__init__('object_detector')
        self.model = YOLO('yolov8n.pt')
        self.bridge = CvBridge()
        self.sub = self.create_subscription(Image, '/camera/image_raw', self.detect, 10)

    def detect(self, msg):
        frame = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
        results = self.model(frame)
        for r in results:
            for box in r.boxes:
                name = self.model.names[int(box.cls[0])]
                self.get_logger().info(f'Detected: {name}')
\`\`\``,
          keyTakeaways: [
            'cv_bridge converts between ROS Image and OpenCV',
            'YOLO integrates easily with ROS2 for real-time detection',
            'Combine multiple perception modalities for robust detection'
          ],
          videos: [
            { id: 'cv-ros-1', title: 'Computer Vision with ROS2', channel: 'The Construct', url: 'https://www.youtube.com/watch?v=2yzSLXMk5AA', description: 'Integrate OpenCV with ROS2 for robot vision.' },
            { id: 'cv-ros-2', title: 'OpenCV Full Course', channel: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=oXlwWbU8l2o', description: 'Comprehensive 4-hour OpenCV course with Python.' }
          ]
        }
      ]
    },
    {
      id: 'ros2-manipulation',
      title: 'Robot Manipulation',
      description: 'Control robot arms with MoveIt 2 for pick-and-place and motion planning.',
      icon: 'Hand',
      order: 7,
      subtopics: [
        {
          id: 'moveit2',
          title: 'MoveIt 2',
          description: 'Motion planning framework for robotic manipulators.',
          difficulty: 'advanced',
          estimatedTime: '5-6 hours',
          content: `# MoveIt 2 - Motion Planning

MoveIt 2 is the most widely used motion planning framework in ROS2.

## Key Features
- Collision-free path planning
- Cartesian path planning
- Pick and place operations
- Kinematic solvers (KDL, TRAC-IK)

## Setup
\`\`\`bash
sudo apt install ros-humble-moveit
\`\`\`

## MoveIt Task Constructor
Enables multi-step manipulation tasks like:
1. Open gripper
2. Approach object
3. Close gripper
4. Lift object
5. Move to place position
6. Open gripper`,
          keyTakeaways: [
            'MoveIt 2 handles collision-free motion planning',
            'Task Constructor enables complex multi-step manipulation',
            'SRDF defines semantic robot descriptions for planning'
          ],
          videos: [
            { id: 'moveit-1', title: 'MoveIt 2 in ROS2 Humble', channel: 'Aleksandar Haber', url: 'https://www.youtube.com/watch?v=gPjoFJBKXf0', description: 'Install MoveIt 2 and start motion planning in RViz.' },
            { id: 'moveit-2', title: 'MoveIt 2 Official Tutorials', channel: 'PickNik Robotics', url: 'https://www.youtube.com/@picknikrobotics/playlists', description: 'Official MoveIt 2 tutorials from the maintainers.' }
          ]
        }
      ]
    }
  ]
};
