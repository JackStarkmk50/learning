import { LearningPath } from '@/types';

export const embeddedPath: LearningPath = {
  id: 'embedded',
  title: 'Embedded Systems & PCB Design',
  slug: 'embedded',
  description: 'Master embedded systems programming, PCB design, electronics fundamentals, and build real hardware projects.',
  longDescription: 'This learning path covers everything from electronics fundamentals to designing professional PCBs and programming microcontrollers. You will learn circuit design principles, master popular microcontroller platforms (Arduino, STM32, ESP32), design PCBs with KiCad, understand communication protocols (I2C, SPI, UART, CAN), work with RTOS, and build real embedded projects. By the end, you will be able to design and manufacture your own electronic boards.',
  icon: 'CircuitBoard',
  color: '#10B981',
  gradient: 'from-emerald-500 to-teal-500',
  prerequisites: ['Basic physics (electricity concepts)', 'Basic programming (C/C++)', 'Basic mathematics'],
  estimatedDuration: '20-26 weeks',
  difficulty: 'Beginner to Advanced',
  tags: ['Embedded', 'PCB Design', 'Electronics', 'Microcontrollers', 'RTOS', 'IoT', 'Wireless', 'BLE', 'LoRa', 'CAN'],
  topics: [
    {
      id: 'electronics-fundamentals',
      title: 'Electronics Fundamentals',
      description: 'Build a strong foundation in electronics: components, circuits, and basic circuit analysis.',
      icon: 'Zap',
      order: 1,
      subtopics: [
        {
          id: 'basic-electronics',
          title: 'Basic Electronics & Components',
          description: 'Understand resistors, capacitors, inductors, diodes, transistors, and basic circuit laws.',
          difficulty: 'beginner',
          estimatedTime: '5-6 hours',
          content: `# Basic Electronics & Components

## Ohm's Law

The fundamental relationship between voltage, current, and resistance:

\`\`\`
V = I × R

Where:
V = Voltage (Volts)
I = Current (Amps)
R = Resistance (Ohms)
\`\`\`

## Power

\`\`\`
P = V × I = I² × R = V² / R
\`\`\`

## Kirchhoff's Laws

### KVL (Voltage Law)
Sum of voltages around any closed loop = 0

### KCL (Current Law)
Sum of currents entering a node = Sum of currents leaving

## Essential Components

### Resistors
- Limit current flow
- Voltage division
- Pull-up/pull-down for digital circuits
- Color code: Black Brown Red Orange Yellow Green Blue Violet Gray White

### Capacitors
- Store electrical energy
- Filtering (decoupling, bypass)
- Timing circuits
- Types: Ceramic (low values), Electrolytic (high values), Tantalum

### Inductors
- Store energy in magnetic field
- Filtering (power supply)
- Impedance matching
- EMI filtering

### Diodes
- Allow current in one direction
- Rectification (AC to DC)
- Voltage regulation (Zener)
- Light emission (LED)

Forward voltage drops:
| Type | Vf |
|---|---|
| Silicon | 0.7V |
| Schottky | 0.2-0.3V |
| LED (Red) | 1.8-2.2V |
| LED (Blue) | 3.0-3.5V |

### Transistors
- BJT (NPN/PNP): Current-controlled switch
- MOSFET (N-ch/P-ch): Voltage-controlled switch
- Used for: Switching, amplification, level shifting

### LED Circuit Design

\`\`\`
R = (Vcc - Vf) / If

Example: 5V supply, Red LED (Vf=2V, If=20mA)
R = (5 - 2) / 0.020 = 150Ω
\`\`\`

## Voltage Divider

\`\`\`
Vout = Vin × R2 / (R1 + R2)
\`\`\`

## Decoupling Capacitors

Every IC needs 100nF ceramic capacitor between VCC and GND, placed as close to the IC as possible. This filters high-frequency noise.`,
          keyTakeaways: [
            'Ohm\'s Law (V=IR) is the foundation of all circuit analysis',
            'Kirchhoff\'s laws govern voltage and current in circuits',
            'Capacitors are essential for filtering — every IC needs decoupling caps',
            'MOSFETs are preferred over BJTs for most switching applications',
            'Always calculate resistor values for LEDs to prevent burnout'
          ],
          videos: [
            {
              id: 'elec-1',
              title: 'Electronics Fundamentals',
              channel: 'The Engineering Mindset',
              url: 'https://www.youtube.com/watch?v=nb4ovfwqup8',
              description: 'Excellent visual introduction to electronics fundamentals with animations.'
            },
            {
              id: 'elec-2',
              title: 'Basic Electronics Course',
              channel: 'GreatScott!',
              url: 'https://www.youtube.com/playlist?list=PLAROrg3NQn7cyu01HpOv5BWo217XWBZu0',
              description: 'Practical electronics basics from the popular maker channel GreatScott!'
            },
            {
              id: 'elec-3',
              title: 'Electronics Engineering Full Course',
              channel: 'Neso Academy',
              url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRiw-GZRqfnlVIBz9dxrqHJS',
              description: 'Comprehensive electronics engineering course covering theory and practice.'
            }
          ]
        },
        {
          id: 'circuit-design',
          title: 'Circuit Design & Analysis',
          description: 'Design and analyze practical circuits for embedded systems.',
          difficulty: 'intermediate',
          estimatedTime: '4-5 hours',
          content: `# Circuit Design & Analysis

## Power Supply Design

### Linear Voltage Regulator

\`\`\`
Input → [LM7805] → 5V Output
        │
      100µF  100nF        100µF  100nF
        │      │            │      │
       GND   GND          GND   GND

Key specs:
- Input voltage: Vin > Vout + 2V (dropout)
- Heat dissipation: P = (Vin - Vout) × Iout
- Maximum current: typically 1A-1.5A
\`\`\`

### Switching Regulator (Buck Converter)

More efficient than linear regulators (85-95% vs 40-60%):

\`\`\`
Components needed:
- Switching IC (e.g., LM2596, MP2307)
- Inductor (22µH-100µH typical)
- Schottky diode (for async topologies)
- Input/Output capacitors (22µF-100µF)
\`\`\`

## Signal Conditioning

### Voltage Level Shifting

\`\`\`
3.3V ↔ 5V conversion methods:
1. Voltage divider (5V → 3.3V only, one direction)
2. BSS138 MOSFET level shifter (bidirectional)
3. TXB0108 level shifter IC (8-channel)
\`\`\`

### Analog Signal Conditioning

\`\`\`
Sensor → [Amplifier] → [Filter] → [ADC]

Op-amp configurations:
- Non-inverting: Gain = 1 + Rf/Rin
- Inverting: Gain = -Rf/Rin
- Differential: Measures voltage difference
\`\`\`

## Protection Circuits

\`\`\`
1. ESD Protection: TVS diodes on I/O lines
2. Reverse Polarity: P-channel MOSFET or Schottky
3. Overcurrent: Polyfuse (resettable fuse)
4. Overvoltage: Zener clamp circuit
\`\`\`

## Common Design Rules

1. **Decoupling**: 100nF + 10µF per power pin
2. **Pull-ups**: 4.7kΩ for I2C, 10kΩ for general
3. **Reset**: 10kΩ pull-up + 100nF to GND
4. **Crystal**: Use load capacitors per datasheet
5. **USB**: 90Ω differential impedance traces`,
          keyTakeaways: [
            'Linear regulators are simple but waste power as heat',
            'Switching regulators are more efficient for large voltage drops',
            'Level shifting is essential when mixing 3.3V and 5V devices',
            'Every design needs protection circuits for reliability',
            'Follow standard design rules for decoupling, pull-ups, and reset'
          ],
          videos: [
            {
              id: 'circuit-1',
              title: 'Power Supply Design',
              channel: 'GreatScott!',
              url: 'https://www.youtube.com/watch?v=IG5vw6P9iY4',
              description: 'Learn to design power supplies for your embedded projects.'
            },
            {
              id: 'circuit-2',
              title: 'Circuit Design Tutorial',
              channel: 'EEVblog',
              url: 'https://www.youtube.com/watch?v=GIGvJuEO0PM',
              description: 'Practical circuit design principles from experienced electronics engineer.'
            }
          ]
        }
      ]
    },
    {
      id: 'microcontrollers',
      title: 'Microcontroller Programming',
      description: 'Program Arduino, STM32, ESP32, and Raspberry Pi for embedded applications.',
      icon: 'Chip',
      order: 2,
      subtopics: [
        {
          id: 'arduino-programming',
          title: 'Arduino Programming',
          description: 'Get started with embedded programming using the Arduino platform.',
          difficulty: 'beginner',
          estimatedTime: '4-5 hours',
          content: `# Arduino Programming

## What is Arduino?

Arduino is an open-source electronics platform based on easy-to-use hardware and software. It's the best starting point for embedded programming.

## Arduino Boards

| Board | MCU | Speed | Flash | RAM | GPIO | Price |
|---|---|---|---|---|---|---|
| Uno R3 | ATmega328P | 16MHz | 32KB | 2KB | 14 | ~$25 |
| Nano | ATmega328P | 16MHz | 32KB | 2KB | 14 | ~$20 |
| Mega 2560 | ATmega2560 | 16MHz | 256KB | 8KB | 54 | ~$40 |
| Due | SAM3X8E | 84MHz | 512KB | 96KB | 54 | ~$40 |

## Basic Structure

\`\`\`cpp
// Every Arduino sketch has two main functions

void setup() {
    // Runs once when board powers up
    Serial.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
    // Runs repeatedly forever
    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000);
    digitalWrite(LED_BUILTIN, LOW);
    delay(1000);
}
\`\`\`

## Digital I/O

\`\`\`cpp
// Output
pinMode(13, OUTPUT);
digitalWrite(13, HIGH);  // Set pin HIGH (5V/3.3V)
digitalWrite(13, LOW);   // Set pin LOW (0V)

// Input
pinMode(2, INPUT_PULLUP);
int state = digitalRead(2);  // Read HIGH or LOW
\`\`\`

## Analog I/O

\`\`\`cpp
// Read analog (10-bit: 0-1023)
int sensorValue = analogRead(A0);
float voltage = sensorValue * (5.0 / 1023.0);

// PWM output (8-bit: 0-255)
analogWrite(9, 128);  // 50% duty cycle
\`\`\`

## Serial Communication

\`\`\`cpp
void setup() {
    Serial.begin(115200);
}

void loop() {
    if (Serial.available()) {
        String cmd = Serial.readString();
        Serial.println("Received: " + cmd);
    }

    // Print sensor data
    int val = analogRead(A0);
    Serial.print("Sensor: ");
    Serial.println(val);
    delay(100);
}
\`\`\`

## Interrupts

\`\`\`cpp
volatile bool buttonPressed = false;

void setup() {
    pinMode(2, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(2),
                    buttonISR, FALLING);
}

void buttonISR() {
    buttonPressed = true;  // Keep ISR short!
}

void loop() {
    if (buttonPressed) {
        buttonPressed = false;
        Serial.println("Button pressed!");
    }
}
\`\`\``,
          keyTakeaways: [
            'Arduino is the best starting point for embedded programming',
            'setup() runs once, loop() runs forever',
            'Use INPUT_PULLUP to avoid floating pin issues',
            'analogRead returns 10-bit values (0-1023)',
            'Keep interrupt service routines (ISR) as short as possible'
          ],
          videos: [
            {
              id: 'arduino-1',
              title: 'Arduino Course for Beginners',
              channel: 'freeCodeCamp',
              url: 'https://www.youtube.com/watch?v=zJ-LqeX_fLU',
              description: 'Complete Arduino programming course from zero to building projects.'
            },
            {
              id: 'arduino-2',
              title: 'Arduino Tutorial for Beginners',
              channel: 'Paul McWhorter',
              url: 'https://www.youtube.com/playlist?list=PLGs0VKk2DiYw-L-RibttcvK-WBZm8WLEP',
              description: '70+ lesson Arduino tutorial series covering everything from basics to advanced topics.'
            }
          ]
        },
        {
          id: 'stm32-programming',
          title: 'STM32 Programming',
          description: 'Professional microcontroller programming with STM32 using HAL and bare-metal.',
          difficulty: 'intermediate',
          estimatedTime: '6-8 hours',
          content: `# STM32 Programming

## Why STM32?

STM32 microcontrollers are industry-standard ARM Cortex-M based MCUs used in professional embedded systems.

| Feature | Arduino (AVR) | STM32 |
|---|---|---|
| Architecture | 8-bit AVR | 32-bit ARM |
| Speed | 16MHz | 72-480MHz |
| Flash | 32KB | 64KB-2MB |
| RAM | 2KB | 20KB-1MB |
| Peripherals | Basic | Advanced (DMA, USB, CAN) |
| Price | $2-5 | $1-10 |
| Ecosystem | Arduino IDE | STM32CubeIDE, PlatformIO |

## Development Setup

1. **STM32CubeIDE** - Official free IDE
2. **STM32CubeMX** - Pin configuration tool
3. **ST-Link** - Programming/debugging probe

## GPIO with HAL

\`\`\`c
// Initialize GPIO (usually done in CubeMX)
GPIO_InitTypeDef GPIO_InitStruct = {0};
GPIO_InitStruct.Pin = GPIO_PIN_13;
GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
GPIO_InitStruct.Pull = GPIO_NOPULL;
GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

// Toggle LED
HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
HAL_Delay(500);

// Read button
GPIO_PinState state = HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_0);
\`\`\`

## UART Communication

\`\`\`c
// Transmit
char msg[] = "Hello STM32!\\r\\n";
HAL_UART_Transmit(&huart2, (uint8_t*)msg, strlen(msg), HAL_MAX_DELAY);

// Receive with interrupt
uint8_t rx_data;
HAL_UART_Receive_IT(&huart2, &rx_data, 1);

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
    // Process received byte
    HAL_UART_Receive_IT(huart, &rx_data, 1);  // Re-enable
}
\`\`\`

## Timers & PWM

\`\`\`c
// Start PWM on TIM2 Channel 1
HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);

// Set duty cycle (0-65535 for 16-bit timer)
__HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, 32768);  // 50%

// Timer interrupt
HAL_TIM_Base_Start_IT(&htim3);

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
    if (htim == &htim3) {
        // Timer interrupt handler
    }
}
\`\`\`

## ADC (Analog to Digital)

\`\`\`c
// Start ADC conversion
HAL_ADC_Start(&hadc1);
HAL_ADC_PollForConversion(&hadc1, HAL_MAX_DELAY);
uint32_t adc_value = HAL_ADC_GetValue(&hadc1);

// Convert to voltage (12-bit ADC, 3.3V reference)
float voltage = adc_value * 3.3f / 4095.0f;
\`\`\``,
          keyTakeaways: [
            'STM32 is the industry standard for professional embedded systems',
            'STM32CubeMX generates initialization code for peripherals',
            'HAL library provides portable hardware abstraction',
            'DMA allows peripheral data transfer without CPU intervention',
            'Start with STM32F4 Discovery or Nucleo boards for learning'
          ],
          videos: [
            {
              id: 'stm32-1',
              title: 'STM32 Programming Tutorial',
              channel: 'Controllerstech',
              url: 'https://www.youtube.com/playlist?list=PLfIJKC1ud8gjLZBzjE3kKBMDEH_lUc428',
              description: 'Comprehensive STM32 programming tutorial series using HAL and CubeIDE.'
            },
            {
              id: 'stm32-2',
              title: 'Bare Metal STM32 Programming',
              channel: 'FastBit Embedded Brain Academy',
              url: 'https://www.youtube.com/playlist?list=PLERTijJOmYrDiiWd10iRHY0VRHdJwUH4t',
              description: 'Learn bare-metal STM32 programming without HAL for deep understanding.'
            },
            {
              id: 'stm32-3',
              title: 'Bare Metal STM32 Programming',
              channel: 'Low Byte Productions',
              url: 'https://www.youtube.com/watch?v=wVbD3Y4-GgA',
              description: 'Deep bare-metal STM32 series by Francis Stokes — starts with LED blink using libopencm3, advances to UART drivers, bootloaders, and cryptographically signed firmware.'
            }
          ]
        },
        {
          id: 'esp32-programming',
          title: 'ESP32 & IoT',
          description: 'Build IoT projects with ESP32\'s WiFi and Bluetooth capabilities.',
          difficulty: 'intermediate',
          estimatedTime: '4-5 hours',
          content: `# ESP32 & IoT Development

## ESP32 Features

- Dual-core 240MHz processor
- WiFi 802.11 b/g/n
- Bluetooth 4.2 + BLE
- 34 GPIO pins
- 12-bit ADC (18 channels)
- Touch sensors
- Hall sensor
- Temperature sensor

## Arduino Framework on ESP32

\`\`\`cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YourNetwork";
const char* password = "YourPassword";

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\\nConnected! IP: " + WiFi.localIP().toString());
}
\`\`\`

## MQTT for IoT

\`\`\`cpp
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
    mqtt.setServer("broker.hivemq.com", 1883);
    mqtt.setCallback(messageCallback);

    while (!mqtt.connected()) {
        mqtt.connect("esp32-client");
    }
    mqtt.subscribe("robot/commands");
}

void loop() {
    mqtt.loop();

    // Publish sensor data
    float temp = readTemperature();
    mqtt.publish("robot/temperature", String(temp).c_str());
    delay(5000);
}

void messageCallback(char* topic, byte* payload, unsigned int length) {
    String message;
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    Serial.println("Received: " + message);
}
\`\`\`

## Web Server on ESP32

\`\`\`cpp
#include <WebServer.h>

WebServer server(80);

void setup() {
    // ... WiFi setup ...

    server.on("/", handleRoot);
    server.on("/led", handleLED);
    server.begin();
}

void handleRoot() {
    server.send(200, "text/html",
        "<h1>ESP32 Robot Control</h1>"
        "<a href='/led?state=on'>LED ON</a><br>"
        "<a href='/led?state=off'>LED OFF</a>");
}

void handleLED() {
    String state = server.arg("state");
    digitalWrite(LED_BUILTIN, state == "on" ? HIGH : LOW);
    server.send(200, "text/plain", "LED " + state);
}
\`\`\``,
          keyTakeaways: [
            'ESP32 is perfect for IoT with built-in WiFi and Bluetooth',
            'Can be programmed with Arduino framework or ESP-IDF',
            'MQTT is the standard protocol for IoT communication',
            'Built-in web server enables remote control interfaces',
            'Dual-core allows network tasks on one core, control on another'
          ],
          videos: [
            {
              id: 'esp32-1',
              title: 'ESP32 Tutorial for Beginners',
              channel: 'DroneBot Workshop',
              url: 'https://www.youtube.com/watch?v=xPlN_Tk3VLQ',
              description: 'Complete ESP32 getting started guide with WiFi and Bluetooth projects.'
            },
            {
              id: 'esp32-2',
              title: 'ESP32 IoT Projects',
              channel: 'Random Nerd Tutorials',
              url: 'https://www.youtube.com/watch?v=8A5t9G4kgnI',
              description: 'Practical IoT projects with ESP32 including MQTT, web servers, and sensors.'
            }
          ]
        }
      ]
    },
    {
      id: 'pcb-design',
      title: 'PCB Design',
      description: 'Design professional PCBs using KiCad — from schematic capture to manufacturing.',
      icon: 'LayoutGrid',
      order: 3,
      subtopics: [
        {
          id: 'kicad-intro',
          title: 'KiCad PCB Design',
          description: 'Learn professional PCB design workflow with the free and open-source KiCad EDA.',
          difficulty: 'intermediate',
          estimatedTime: '8-10 hours',
          content: `# KiCad PCB Design

## PCB Design Workflow

1. **Schematic Capture** → Draw circuit schematic
2. **Component Selection** → Choose real parts with footprints
3. **Netlist Generation** → Export connections
4. **Board Layout** → Place components on PCB
5. **Routing** → Connect traces between components
6. **Design Rule Check** → Verify manufacturing constraints
7. **Gerber Export** → Generate manufacturing files
8. **Ordering** → Send to PCB fab house

## KiCad Projects

A KiCad project contains:
- \`.kicad_pro\` - Project file
- \`.kicad_sch\` - Schematic
- \`.kicad_pcb\` - PCB layout
- \`.kicad_sym\` / \`.kicad_mod\` - Custom library files

## Schematic Best Practices

1. **Use hierarchical sheets** for complex designs
2. **Label all nets** with meaningful names
3. **Add power flags** to power nets
4. **Include decoupling capacitors** for every IC
5. **Add test points** for debugging
6. **Include mounting holes**

## PCB Layout Guidelines

### Trace Width

| Current | Trace Width (1oz copper) |
|---|---|
| 0.3A | 0.25mm (10mil) |
| 0.5A | 0.50mm (20mil) |
| 1.0A | 1.00mm (40mil) |
| 2.0A | 2.50mm (100mil) |
| 3.0A | 5.00mm (200mil) |

### Design Rules

\`\`\`
Minimum trace width:     0.15mm (6mil)
Minimum clearance:       0.15mm (6mil)
Minimum via drill:       0.3mm
Minimum via annular ring: 0.15mm
Minimum hole size:       0.8mm
\`\`\`

### Layer Stack (4-layer)

| Layer | Purpose |
|---|---|
| Top (F.Cu) | Signal + Components |
| Inner 1 (In1.Cu) | Ground plane |
| Inner 2 (In2.Cu) | Power plane |
| Bottom (B.Cu) | Signal + Components |

## Manufacturing (Ordering PCBs)

Popular PCB manufacturers:
- **JLCPCB** (China) - From $2 for 5 boards
- **PCBWay** (China) - Good quality, fast
- **OSH Park** (USA) - Purple boards, 3 copies
- **Aisler** (Europe) - Fast European delivery

### Gerber Files to Generate

\`\`\`
- F.Cu.gbr (Front copper)
- B.Cu.gbr (Back copper)
- F.SilkS.gbr (Front silkscreen)
- B.SilkS.gbr (Back silkscreen)
- F.Mask.gbr (Front solder mask)
- B.Mask.gbr (Back solder mask)
- Edge.Cuts.gbr (Board outline)
- PTH.drl (Plated through holes)
- NPTH.drl (Non-plated through holes)
\`\`\``,
          keyTakeaways: [
            'KiCad is free, open-source, and industry-capable for PCB design',
            'Follow the workflow: Schematic → Layout → Route → DRC → Manufacture',
            'Always calculate trace widths based on current requirements',
            'Ground and power planes improve signal integrity',
            'JLCPCB and PCBWay offer affordable PCB manufacturing'
          ],
          videos: [
            {
              id: 'kicad-1',
              title: 'KiCad 8 Complete Tutorial',
              channel: "Phil's Lab",
              url: 'https://www.youtube.com/watch?v=aVUqaB0IMh4',
              description: 'Complete KiCad tutorial from schematic to PCB layout with best practices.'
            },
            {
              id: 'kicad-2',
              title: 'KiCad PCB Design Course',
              channel: 'DigiKey',
              url: 'https://www.youtube.com/playlist?list=PLEBQazB0HUyR24ckSFqDi-n4oSTl_wLWQ',
              description: 'DigiKey official KiCad course covering complete PCB design workflow.'
            },
            {
              id: 'kicad-3',
              title: 'PCB Design for Beginners',
              channel: 'Robert Feranec',
              url: 'https://www.youtube.com/watch?v=aODkA2mrimQ',
              description: 'Learn PCB design fundamentals from an experienced hardware engineer.'
            },
            {
              id: 'kicad-4',
              title: 'KiCad 9 Hardware Design Tutorial (TI MSPM0) - Schematic',
              channel: "Phil's Lab",
              url: 'https://www.youtube.com/watch?v=O-zNn5k5Bn4',
              description: 'Up-to-date KiCad 9 tutorial covering schematic design for a TI MSPM0 microcontroller board. Part 1 of 2.'
            },
            {
              id: 'kicad-5',
              title: 'KiCad 9 Hardware Design Tutorial (TI MSPM0) - PCB',
              channel: "Phil's Lab",
              url: 'https://www.youtube.com/watch?v=igQWdVGZGpI',
              description: 'KiCad 9 PCB layout and routing tutorial. Part 2 of 2, covering component placement, routing, and manufacturing output.'
            },
            {
              id: 'kicad-6',
              title: 'KiCad 9: ESP32 IoT 4-Layer PCB - A Complete Guide',
              channel: 'Tech Explorations',
              url: 'https://www.youtube.com/watch?v=LO9AO0XTX3M',
              description: 'Complete guide to designing and assembling an ESP32 IoT 4-layer PCB in KiCad 9, loaded with peripherals.'
            },
            {
              id: 'kicad-7',
              title: 'KiCad 10 Made Simple: From Zero to a Real PCB',
              channel: 'Make Stuff',
              url: 'https://www.youtube.com/watch?v=g3vxpdG1chs',
              description: 'Beginner-friendly walkthrough of KiCad 10 — from absolute zero experience to a manufacturable board (July 2026).'
            }
          ]
        },
        {
          id: 'emc-design',
          title: 'EMC Design & Signal Integrity',
          description: 'Design PCBs that pass EMC testing: grounding, shielding, filtering, and high-speed signal integrity.',
          difficulty: 'advanced',
          estimatedTime: '5-6 hours',
          content: `# EMC Design & Signal Integrity

## What is EMC?

Electromagnetic Compatibility (EMC) is the ability of electronic equipment to function correctly in its electromagnetic environment without introducing intolerable electromagnetic disturbances to anything in that environment.

EMC has two aspects:
- **Emissions**: Unwanted electromagnetic energy your device radiates or conducts
- **Immunity/Susceptibility**: Your device's ability to operate correctly when exposed to external electromagnetic energy

## Why EMC Matters

- **Legal requirement**: All commercial products must pass EMC certification (FCC in US, CE in EU, CISPR internationally)
- **Reliability**: Poor EMC design causes field failures, resets, data corruption
- **Cost**: Failing EMC testing late in development is extremely expensive — redesigns, re-spins, shielding band-aids

## EMC Fundamentals

### Sources of Electromagnetic Interference (EMI)

\`\`\`
Common EMI sources in embedded systems:
- Switching power supplies (buck/boost converters)
- High-speed digital signals (clocks, data buses)
- PWM outputs (motor drivers, LED drivers)
- Wireless transmitters (WiFi, BLE, LoRa)
- ESD events
\`\`\`

### The EMI Equation

Every EMI problem has three elements:
1. **Source** — the circuit generating noise
2. **Coupling path** — how noise travels (conducted or radiated)
3. **Victim** — the circuit being affected

Fix any one of the three to solve the problem.

### Coupling Mechanisms

| Mechanism | Description | Fix |
|---|---|---|
| Conducted | Noise travels through wires/traces | Filtering (capacitors, ferrites) |
| Radiated | Noise travels through air as EM waves | Shielding, shorter traces |
| Capacitive (E-field) | Coupling between parallel traces/wires | Increase spacing, ground guard |
| Inductive (H-field) | Coupling between current loops | Reduce loop area, twist pairs |

## Grounding Strategies

### Single-Point vs Multi-Point Grounding

\`\`\`
Single-point ground (low frequency < 1MHz):
  All returns go to one common point
  Prevents ground loops

Multi-point ground (high frequency > 10MHz):
  Multiple short connections to ground plane
  Minimizes impedance at high frequencies

Hybrid (mixed-signal):
  Separate analog and digital grounds
  Connect at a single point near ADC/DAC
\`\`\`

### Ground Plane Best Practices

- Use unbroken ground planes on inner layers
- Never route signals across ground plane splits
- Keep return current paths short and direct
- Place decoupling capacitors close to IC power pins
- Use via stitching around board edges and between ground areas

## Shielding

### Board-Level Shielding

\`\`\`
Shield can types:
- One-piece: Soldered directly, hard to rework
- Two-piece (fence + lid): Easy rework and debugging
- Selective: Shield only noisy sections (RF, switching regulators)

Shield effectiveness depends on:
- Material (mu-metal for magnetic, copper/aluminum for electric)
- Aperture size (openings must be << wavelength/20)
- Ground connection quality
\`\`\`

## Filtering

### Decoupling Strategy

\`\`\`
Per IC:
  100nF ceramic (high frequency) — closest to pin
  10µF ceramic or tantalum (bulk) — nearby

Per power rail:
  100µF bulk electrolytic at regulator output
  Ferrite bead between noisy and quiet sections

Power entry:
  Common-mode choke + X/Y capacitors
  TVS diodes for surge protection
\`\`\`

### Ferrite Beads

- Act as frequency-dependent resistors
- Place on power lines between noisy and sensitive sections
- Choose impedance at target frequency (typically 100MHz)
- Watch for resonance with bypass capacitors

## PCB Layout for EMC

### Trace Routing Rules

1. **Minimize loop areas** — route signal and return together
2. **Keep high-speed traces short** — shorter = less antenna
3. **Avoid 90-degree bends** — use 45-degree or curved traces
4. **Separate analog from digital** — route in different board areas
5. **Use ground guard traces** around sensitive signals
6. **Route clocks on inner layers** — sandwiched between ground planes

### Component Placement

\`\`\`
Placement priority:
1. Connectors at board edges
2. Power supply near input connector
3. Decoupling caps next to IC pins (< 3mm)
4. Crystals/oscillators close to MCU
5. Sensitive analog circuits away from digital/switching
6. EMI filters at board entry points
\`\`\`

### Stack-Up for EMC (4-layer)

| Layer | Purpose | Notes |
|---|---|---|
| L1 (Top) | Signals + Components | High-speed on top near ground |
| L2 | Ground plane | Unbroken, continuous reference |
| L3 | Power plane | Split if multiple voltages |
| L4 (Bottom) | Signals + Components | Lower-speed signals OK here |

## Signal Integrity Basics

### Transmission Line Effects

When trace length > wavelength/10, treat as transmission line:

\`\`\`
Rule of thumb: f(GHz) × trace_length(inches) > 1
  → Need controlled impedance

Common impedance targets:
  Single-ended: 50Ω
  Differential USB: 90Ω
  Differential Ethernet: 100Ω
\`\`\`

### Reflections and Termination

\`\`\`
Unterminated line → reflections → ringing → EMI + errors

Termination methods:
  Series: Resistor at source (simple, low power)
  Parallel: Resistor at receiver to ground (good for buses)
  AC: Capacitor + resistor at receiver (saves DC power)
  Thevenin: Two resistors to VCC and GND (good for buses)
\`\`\`

## Measurement and Certification

### Pre-Compliance Testing

- **Near-field probes**: Sniff EMI from specific board areas
- **Spectrum analyzer**: Measure emissions spectrum
- **Current probe**: Measure conducted emissions on cables
- **TEM cell or GTEM**: Low-cost radiated emissions screening

### Certification Standards

| Standard | Region | Scope |
|---|---|---|
| FCC Part 15 | USA | Radiated and conducted emissions |
| EN 55032 | EU (CE) | Emissions for multimedia equipment |
| EN 55035 | EU (CE) | Immunity for multimedia equipment |
| CISPR 32 | International | Emissions (basis for EN 55032) |
| IEC 61000-4-x | International | Immunity test methods |

### Common Certification Tests

1. **Radiated emissions** (30MHz - 1GHz+)
2. **Conducted emissions** (150kHz - 30MHz)
3. **ESD immunity** (contact and air discharge)
4. **Radiated immunity** (RF field exposure)
5. **Electrical fast transient (EFT/Burst)**
6. **Surge immunity**`,
          keyTakeaways: [
            'Every EMI problem has a source, coupling path, and victim — fix any one to solve it',
            'Unbroken ground planes are the single most important EMC design practice',
            'Minimize current loop areas to reduce both emissions and susceptibility',
            'Filter at power entry points and between noisy/sensitive sections',
            'Pre-compliance testing with near-field probes saves expensive lab time',
            'Route high-speed signals on inner layers between ground planes'
          ],
          videos: [
            {
              id: 'emc-1',
              title: 'Introduction - PCB Design for Good EMC',
              channel: 'Texas Instruments',
              url: 'https://www.youtube.com/watch?v=3FJsfiiYRPA',
              description: 'TI Precision Labs series on PCB design for EMC — covers fundamentals, ground planes, and measured test data for 4-layer boards.'
            },
            {
              id: 'emc-2',
              title: '3 Basic Tricks For EMC Compliant PCB Layout',
              channel: 'Robert Feranec',
              url: 'https://www.youtube.com/watch?v=KCLo4CyyeNk',
              description: 'Three practical principles for designing EMC-compliant PCB layouts from an experienced hardware engineer.'
            },
            {
              id: 'emc-3',
              title: 'All about EMC - A PCB Block Diagram',
              channel: 'DENPAFLUX',
              url: 'https://www.youtube.com/watch?v=YMIchcHk5Q0',
              description: 'EMC design methodology covering stackup optimization, ground plane implementation, and component placement.'
            },
            {
              id: 'emc-4',
              title: 'Introduction to Electromagnetic Compatibility (EMC)',
              channel: 'LearnEMC',
              url: 'https://www.youtube.com/watch?v=UJ-W40WB8AI',
              description: 'Full EMC course introduction covering antennas, emissions, immunity, and surges for PCB designers.'
            }
          ]
        }
      ]
    },
    {
      id: 'comm-protocols',
      title: 'Communication Protocols',
      description: 'Master I2C, SPI, UART, CAN, and other protocols for connecting devices.',
      icon: 'Cable',
      order: 4,
      subtopics: [
        {
          id: 'serial-protocols',
          title: 'Serial Communication (UART, I2C, SPI)',
          description: 'Understand and implement the most common embedded communication protocols.',
          difficulty: 'intermediate',
          estimatedTime: '5-6 hours',
          content: `# Serial Communication Protocols

## UART (Universal Asynchronous Receiver-Transmitter)

\`\`\`
TX ──────── RX
RX ──────── TX
GND ─────── GND

- Point-to-point communication
- Asynchronous (no clock)
- Common baud rates: 9600, 115200
- Full duplex (simultaneous send/receive)
\`\`\`

### Configuration
- **Baud rate**: 9600, 19200, 38400, 57600, 115200
- **Data bits**: 7 or 8
- **Parity**: None, Even, Odd
- **Stop bits**: 1 or 2

## I2C (Inter-Integrated Circuit)

\`\`\`
         ┌─── Device 1 (0x48)
SCL ─────┼─── Device 2 (0x68)
SDA ─────┼─── Device 3 (0x76)
         └─── Device N

- Multi-device bus (up to 127 devices)
- 2 wires: SCL (clock) + SDA (data)
- Master-slave architecture
- Speeds: 100kHz (standard), 400kHz (fast), 1MHz (fast+)
- Requires pull-up resistors (4.7kΩ typical)
\`\`\`

### Common I2C Devices
| Device | Address | Function |
|---|---|---|
| MPU6050 | 0x68 | IMU (Accel + Gyro) |
| BMP280 | 0x76/0x77 | Pressure/Temperature |
| OLED SSD1306 | 0x3C | Display |
| PCA9685 | 0x40 | PWM driver |
| ADS1115 | 0x48 | 16-bit ADC |

### Arduino I2C Example

\`\`\`cpp
#include <Wire.h>

void setup() {
    Wire.begin();  // Join I2C as master
}

void readSensor(uint8_t addr, uint8_t reg) {
    Wire.beginTransmission(addr);
    Wire.write(reg);
    Wire.endTransmission(false);  // Repeated start
    Wire.requestFrom(addr, (uint8_t)2);

    if (Wire.available() >= 2) {
        uint8_t high = Wire.read();
        uint8_t low = Wire.read();
        int16_t value = (high << 8) | low;
    }
}
\`\`\`

## SPI (Serial Peripheral Interface)

\`\`\`
MOSI ──────── MOSI (Master Out, Slave In)
MISO ──────── MISO (Master In, Slave Out)
SCLK ──────── SCLK (Serial Clock)
CS0  ──────── CS   (Chip Select, active LOW)

- 4 wires (+ 1 CS per device)
- Full duplex
- Fastest serial protocol (up to 80MHz+)
- No addressing — uses chip select
\`\`\`

### Arduino SPI Example

\`\`\`cpp
#include <SPI.h>

#define CS_PIN 10

void setup() {
    SPI.begin();
    pinMode(CS_PIN, OUTPUT);
    digitalWrite(CS_PIN, HIGH);
}

uint8_t spiTransfer(uint8_t data) {
    digitalWrite(CS_PIN, LOW);
    uint8_t result = SPI.transfer(data);
    digitalWrite(CS_PIN, HIGH);
    return result;
}
\`\`\`

## Protocol Comparison

| Feature | UART | I2C | SPI |
|---|---|---|---|
| Wires | 2 | 2 | 4+ |
| Speed | Up to 1Mbps | Up to 3.4Mbps | Up to 80MHz+ |
| Devices | 2 (P2P) | 127 | Limited by CS |
| Duplex | Full | Half | Full |
| Clock | Async | Sync | Sync |
| Distance | Long | Short (<1m) | Very short |`,
          keyTakeaways: [
            'UART is simplest — two wires, point-to-point, no clock needed',
            'I2C is great for multiple slow devices on just 2 wires',
            'SPI is fastest but uses more wires and one CS per device',
            'I2C needs pull-up resistors on SDA and SCL lines',
            'Choose protocol based on speed needs, device count, and available pins'
          ],
          videos: [
            {
              id: 'proto-1',
              title: 'SPI, I2C, UART Explained',
              channel: 'GreatScott!',
              url: 'https://www.youtube.com/watch?v=IyGwvGzrqp8',
              description: 'Clear explanation of the three main serial communication protocols.'
            },
            {
              id: 'proto-2',
              title: 'Communication Protocols',
              channel: 'Ben Eater',
              url: 'https://www.youtube.com/watch?v=sTHckUyxwp8',
              description: 'Deep dive into how serial communication protocols work at the hardware level.'
            }
          ]
        },
        {
          id: 'wireless-protocols',
          title: 'Wireless Protocols (BLE, WiFi, LoRa)',
          description: 'Understand and implement wireless communication protocols for IoT: Bluetooth Low Energy, WiFi, and LoRa/LoRaWAN.',
          difficulty: 'intermediate',
          estimatedTime: '6-8 hours',
          content: `# Wireless Protocols for IoT

## Overview

Modern embedded systems rely heavily on wireless communication. Three protocols dominate IoT:

| Protocol | Range | Data Rate | Power | Best For |
|---|---|---|---|---|
| BLE | 10-100m | 1-2 Mbps | Very Low | Wearables, sensors, beacons |
| WiFi | 50-100m | 1-600+ Mbps | High | Data-heavy, cloud-connected |
| LoRa | 2-15 km | 0.3-50 kbps | Very Low | Long-range remote sensors |

---

## Bluetooth Low Energy (BLE)

### BLE Architecture

BLE (Bluetooth 4.0+) is designed for low-power, short-range communication. It is fundamentally different from Bluetooth Classic.

\`\`\`
BLE Protocol Stack:

┌─────────────────────────────┐
│       Application           │
├─────────────────────────────┤
│   GAP        │    GATT      │  ← Profiles
├──────────────┼──────────────┤
│   ATT        │    SMP       │  ← Protocol Layer
├─────────────────────────────┤
│          L2CAP              │
├─────────────────────────────┤
│          HCI                │
├─────────────────────────────┤
│      Link Layer             │
├─────────────────────────────┤
│    Physical Layer (2.4GHz)  │
└─────────────────────────────┘
\`\`\`

### GAP (Generic Access Profile)

GAP controls connections and advertising. It defines device roles:

- **Peripheral** (advertiser): Broadcasts its presence, accepts connections (e.g., sensor, fitness band)
- **Central** (scanner): Scans for peripherals, initiates connections (e.g., smartphone, gateway)
- **Broadcaster**: Advertises data without accepting connections (e.g., beacon)
- **Observer**: Scans for broadcasters without connecting

### GATT (Generic Attribute Profile)

GATT defines how data is structured and exchanged over a BLE connection:

\`\`\`
GATT Hierarchy:

Profile
 └── Service (UUID: 0x180D — Heart Rate)
      ├── Characteristic (UUID: 0x2A37 — Heart Rate Measurement)
      │    ├── Value: 72 bpm
      │    └── Descriptor (CCCD: enable notifications)
      └── Characteristic (UUID: 0x2A38 — Body Sensor Location)
           └── Value: Chest
\`\`\`

- **Services** group related functionality (identified by UUID)
- **Characteristics** are individual data points (read, write, notify)
- **Descriptors** provide metadata about characteristics
- **Standard profiles**: Heart Rate, Battery, Device Information, Environmental Sensing

### BLE on ESP32 Example

\`\`\`cpp
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

BLECharacteristic *pCharacteristic;

void setup() {
    Serial.begin(115200);
    BLEDevice::init("ESP32-Sensor");

    BLEServer *pServer = BLEDevice::createServer();
    BLEService *pService = pServer->createService(SERVICE_UUID);

    pCharacteristic = pService->createCharacteristic(
        CHARACTERISTIC_UUID,
        BLECharacteristic::PROPERTY_READ |
        BLECharacteristic::PROPERTY_NOTIFY
    );
    pCharacteristic->addDescriptor(new BLE2902());

    pService->start();
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->start();
}

void loop() {
    float temperature = readSensor();
    pCharacteristic->setValue(temperature);
    pCharacteristic->notify();
    delay(2000);
}
\`\`\`

---

## WiFi for IoT

### Power Consumption Challenge

WiFi is power-hungry compared to BLE and LoRa. A typical ESP32 draws:

| Mode | Current |
|---|---|
| Active TX | 160-260 mA |
| Active RX | 95-100 mA |
| Modem sleep | 20 mA |
| Light sleep | 0.8 mA |
| Deep sleep | 10 µA |

### Power Optimization Strategies

1. **Deep sleep with timed wake**: Sleep for minutes, wake to transmit, sleep again
2. **Modem sleep**: Keep CPU active, turn off WiFi between transmissions
3. **Batch data**: Collect readings, send in bulk to reduce radio-on time
4. **Static IP**: Avoid DHCP negotiation on every wake (saves 1-3 seconds)

### WiFi Provisioning for IoT

Devices without displays need a way to configure WiFi credentials:

\`\`\`
Provisioning methods:
1. SoftAP mode: Device creates its own AP, user connects and enters credentials
2. BLE provisioning: Use BLE to send WiFi credentials (ESP-IDF supports this)
3. SmartConfig / ESP-Touch: Smartphone app broadcasts encoded credentials
4. WPS: Push-button pairing (less common in IoT)
\`\`\`

### ESP32 WiFi with Deep Sleep

\`\`\`cpp
#include <WiFi.h>
#include <HTTPClient.h>

#define SLEEP_DURATION_US  300000000  // 5 minutes

void setup() {
    WiFi.begin("SSID", "password");
    while (WiFi.status() != WL_CONNECTED) delay(100);

    // Send sensor data
    HTTPClient http;
    http.begin("https://api.example.com/data");
    http.addHeader("Content-Type", "application/json");
    http.POST("{\\"temp\\": 23.5}");
    http.end();

    // Enter deep sleep
    esp_deep_sleep(SLEEP_DURATION_US);
}

void loop() {} // Never reached
\`\`\`

---

## LoRa / LoRaWAN

### What is LoRa?

LoRa (Long Range) is a spread-spectrum modulation technique that enables long-range, low-power wireless communication.

\`\`\`
LoRa vs LoRaWAN:
- LoRa: Physical layer modulation (the radio)
- LoRaWAN: Network protocol built on top of LoRa (the network)
\`\`\`

### LoRa Modulation — Chirp Spread Spectrum (CSS)

\`\`\`
Key parameters:
- Spreading Factor (SF7-SF12): Higher SF = longer range, slower data
- Bandwidth (125/250/500 kHz): Higher BW = faster data, shorter range
- Coding Rate (4/5 to 4/8): Higher CR = more error correction, slower

Trade-off table:
| SF | Range | Data Rate | Airtime (10 bytes) |
|----|-------|-----------|-------------------|
| SF7  | Short  | 5.5 kbps  | 36 ms   |
| SF9  | Medium | 1.8 kbps  | 144 ms  |
| SF12 | Long   | 0.3 kbps  | 1155 ms |
\`\`\`

### LoRaWAN Network Architecture

\`\`\`
[End Device] ──radio──→ [Gateway] ──IP──→ [Network Server] ──→ [Application]
[End Device] ──radio──→ [Gateway] ──IP──↗
[End Device] ──radio──→

- End devices: Sensors with LoRa radio (battery-powered)
- Gateways: Receive LoRa, forward to network server via IP
- Network Server: Manages devices, deduplication, routing
- Application Server: Business logic, data storage
\`\`\`

### Device Classes

| Class | Behavior | Battery | Latency | Use Case |
|---|---|---|---|---|
| A | TX then 2 short RX windows | Best | High | Sensors |
| B | Scheduled RX windows (beacon) | Good | Medium | Actuators |
| C | Always listening | Worst | Low | Mains-powered |

### The Things Network (TTN)

TTN is a free, community-driven LoRaWAN network:

1. Register on thethingsnetwork.org
2. Register your gateway (if you have one)
3. Create an application
4. Register end devices (OTAA or ABP activation)
5. Decode payloads with JavaScript decoder functions
6. Integrate with MQTT, HTTP webhooks, or storage

### LoRa with Arduino (RFM95W)

\`\`\`cpp
#include <SPI.h>
#include <LoRa.h>

#define SS_PIN   18
#define RST_PIN  14
#define DIO0_PIN 26

void setup() {
    Serial.begin(115200);
    LoRa.setPins(SS_PIN, RST_PIN, DIO0_PIN);

    if (!LoRa.begin(915E6)) {  // 915 MHz (US), 868 MHz (EU)
        Serial.println("LoRa init failed!");
        while (1);
    }
    LoRa.setSpreadingFactor(7);
    LoRa.setSignalBandwidth(125E3);
}

void loop() {
    LoRa.beginPacket();
    LoRa.print("Hello LoRa!");
    LoRa.endPacket();
    delay(10000);
}
\`\`\`

---

## Protocol Comparison Table

| Feature | BLE | WiFi | LoRa |
|---|---|---|---|
| Range | 10-100m | 50-100m | 2-15 km |
| Data Rate | 1-2 Mbps | 1-600+ Mbps | 0.3-50 kbps |
| Power | Very Low | High | Very Low |
| Topology | Star | Star | Star-of-stars |
| Frequency | 2.4 GHz | 2.4/5 GHz | Sub-GHz (ISM) |
| IP Native | No | Yes | No (bridged) |
| Best For | Wearables, sensors | Cloud-connected | Remote monitoring |
| Battery Life | Months-years | Hours-days | Years |
| Cost/Module | $1-3 | $2-5 | $5-10 |`,
          keyTakeaways: [
            'BLE uses GATT profiles with services and characteristics to structure data exchange',
            'WiFi is power-hungry — use deep sleep and batched transmissions for battery devices',
            'LoRa achieves kilometer-range at the cost of very low data rates (kbps)',
            'LoRaWAN adds network management on top of LoRa physical layer',
            'Choose protocol based on range, data rate, power budget, and whether you need IP connectivity',
            'The Things Network provides free LoRaWAN infrastructure for IoT projects'
          ],
          videos: [
            {
              id: 'wireless-1',
              title: 'LoRa / LoRaWAN De-Mystified / Tutorial',
              channel: 'Andreas Spiess',
              url: 'https://www.youtube.com/watch?v=hMOwbNUpDQA',
              description: 'Excellent demystification of LoRa and LoRaWAN covering the basic principles, pros, cons, and when to use it.'
            },
            {
              id: 'wireless-2',
              title: 'LoRa - Long-Range Radio for IoT | Arduino, ESP32, RPI Pico',
              channel: 'DroneBot Workshop',
              url: 'https://www.youtube.com/watch?v=YQ7aLHCTeeE',
              description: 'Comprehensive 1-hour tutorial covering LoRa basics with Arduino, ESP32, and Raspberry Pi Pico using RFM95W modules.'
            },
            {
              id: 'wireless-3',
              title: 'Bluetooth Low Energy: Architecture, Security, and Embedded Integration',
              channel: 'Mach One Design',
              url: 'https://www.youtube.com/watch?v=0unlffVmyxI',
              description: 'BLE architecture deep dive covering GAP, GATT, security, and integration with embedded systems.'
            },
            {
              id: 'wireless-4',
              title: 'ESP32 BLE Tutorial',
              channel: 'Random Nerd Tutorials',
              url: 'https://www.youtube.com/watch?v=8A5t9G4kgnI',
              description: 'Practical BLE implementation on ESP32 — setting up GATT server, scanner, and connecting to smartphones.'
            }
          ]
        },
        {
          id: 'can-bus',
          title: 'CAN Bus Protocol',
          description: 'Understand the Controller Area Network (CAN) protocol used in automotive, industrial, and robotics systems.',
          difficulty: 'intermediate',
          estimatedTime: '3-4 hours',
          content: `# CAN Bus Protocol

## What is CAN?

Controller Area Network (CAN) is a robust serial communication protocol designed by Bosch in the 1980s for automotive applications. It is now widely used in automotive, industrial automation, medical devices, and robotics.

### Why CAN?

- **Multi-master**: Any node can transmit when the bus is free
- **Deterministic**: Priority-based arbitration ensures critical messages get through
- **Robust**: Differential signaling, CRC, and error handling for noisy environments
- **Long distance**: Up to 1 km at lower speeds
- **Low cost**: Only 2 wires needed

## CAN Physical Layer

### Wiring

\`\`\`
CAN Bus (2-wire differential):

    ┌──────┐     ┌──────┐     ┌──────┐
    │Node 1│     │Node 2│     │Node 3│
    └──┬───┘     └──┬───┘     └──┬───┘
  CAN_H│────────────│────────────│────── CAN_H
  CAN_L│────────────│────────────│────── CAN_L
       │                              │
     [120Ω]                        [120Ω]
       │                              │
      GND                           GND

- 120Ω termination resistors at each end of the bus
- Twisted pair cable recommended
- Max 40 nodes (classic CAN)
\`\`\`

### Signal Levels

\`\`\`
Dominant (logical 0):
  CAN_H = 3.5V, CAN_L = 1.5V  (differential = 2V)

Recessive (logical 1):
  CAN_H = 2.5V, CAN_L = 2.5V  (differential = 0V)

Dominant always wins over recessive — this enables arbitration.
\`\`\`

### Speed vs Distance

| Speed | Max Bus Length |
|---|---|
| 1 Mbps | 40 m |
| 500 kbps | 100 m |
| 250 kbps | 250 m |
| 125 kbps | 500 m |
| 50 kbps | 1000 m |

## CAN Message Frames

### Standard Frame (CAN 2.0A)

\`\`\`
┌─────┬────┬─────┬──────┬─────┬────┬─────┬─────┬─────┐
│ SOF │ ID │ RTR │ IDE  │ DLC │DATA│ CRC │ ACK │ EOF │
│ 1b  │11b │ 1b  │ 1b   │ 4b  │0-8B│ 15b │ 2b  │ 7b  │
└─────┴────┴─────┴──────┴─────┴────┴─────┴─────┴─────┘

SOF: Start of Frame (dominant bit)
ID:  11-bit identifier (also determines priority)
RTR: Remote Transmission Request
IDE: Identifier Extension (0 = standard)
DLC: Data Length Code (0-8 bytes)
DATA: 0 to 8 bytes payload
CRC: 15-bit cyclic redundancy check
ACK: Acknowledgment slot
EOF: End of Frame (7 recessive bits)
\`\`\`

### Extended Frame (CAN 2.0B)

Uses 29-bit identifier for more addresses (11 base + 18 extension).

### Key Concepts

- **Message-based, not address-based**: Messages have IDs, not nodes
- **Broadcast**: All nodes see all messages, filter by ID
- **No routing**: Single bus segment, no switches or routers

## Arbitration

CAN uses non-destructive bitwise arbitration:

\`\`\`
Example: Node A (ID 0x100) and Node B (ID 0x200) transmit simultaneously

Bit position:  10  9  8  7  6  5  4  3  2  1  0
Node A (0x100): 0  0  1  0  0  0  0  0  0  0  0
Node B (0x200): 0  1  0  0  0  0  0  0  0  0  0
Bus result:     0  0  ← Node B sees dominant when it sent recessive
                       → Node B stops transmitting, Node A wins

Lower ID = Higher priority
\`\`\`

## Error Handling

CAN has 5 error detection mechanisms:

1. **Bit error**: Transmitter monitors bus, detects mismatch
2. **Stuff error**: After 5 identical bits, a stuff bit is expected
3. **CRC error**: CRC mismatch in received frame
4. **Form error**: Fixed-format field has wrong value
5. **ACK error**: No receiver acknowledged the frame

### Error States

\`\`\`
Error-Active → Error-Passive → Bus-Off
  (TEC < 128)    (TEC < 256)    (TEC ≥ 256)

TEC = Transmit Error Counter
REC = Receive Error Counter

Nodes automatically recover from Bus-Off after 128 × 11 recessive bits.
\`\`\`

## CAN FD (Flexible Data Rate)

CAN FD extends classic CAN:

| Feature | Classic CAN | CAN FD |
|---|---|---|
| Max data | 8 bytes | 64 bytes |
| Max bitrate | 1 Mbps | 8 Mbps (data phase) |
| Arbitration | Same | Same speed as classic |
| CRC | 15-bit | 17-bit or 21-bit |

CAN FD uses dual bitrate: slow for arbitration (compatibility), fast for data payload.

## Hardware: MCP2515 CAN Controller

The MCP2515 is a popular SPI-based CAN controller for Arduino and STM32.

### Wiring with Arduino

\`\`\`
Arduino        MCP2515 Module
  D13 (SCK)  → SCK
  D12 (MISO) → SO
  D11 (MOSI) → SI
  D10 (SS)   → CS
  D2  (INT)  → INT
  5V         → VCC
  GND        → GND

Module includes MCP2515 + TJA1050 transceiver
\`\`\`

### Arduino CAN Example

\`\`\`cpp
#include <SPI.h>
#include <mcp_can.h>

MCP_CAN CAN(10);  // CS on pin 10

void setup() {
    Serial.begin(115200);
    if (CAN.begin(MCP_ANY, CAN_500KBPS, MCP_8MHZ) == CAN_OK) {
        Serial.println("CAN init OK");
    }
    CAN.setMode(MCP_NORMAL);
}

// Transmit
void sendMessage() {
    uint8_t data[] = {0x01, 0x02, 0x03, 0x04};
    CAN.sendMsgBuf(0x100, 0, 4, data);  // ID, ext, len, data
}

// Receive
void loop() {
    if (CAN.checkReceive() == CAN_MSGAVAIL) {
        long unsigned int id;
        uint8_t len;
        uint8_t buf[8];
        CAN.readMsgBuf(&id, &len, buf);

        Serial.print("ID: 0x");
        Serial.print(id, HEX);
        Serial.print(" Data: ");
        for (int i = 0; i < len; i++) {
            Serial.print(buf[i], HEX);
            Serial.print(" ");
        }
        Serial.println();
    }
}
\`\`\`

### STM32 Built-in CAN (bxCAN)

STM32F1/F4 series have built-in CAN controllers. Configure via STM32CubeMX:

\`\`\`c
// STM32 HAL CAN transmit
CAN_TxHeaderTypeDef txHeader;
uint8_t txData[8] = {0x01, 0x02, 0x03, 0x04};
uint32_t txMailbox;

txHeader.StdId = 0x100;
txHeader.IDE = CAN_ID_STD;
txHeader.RTR = CAN_RTR_DATA;
txHeader.DLC = 4;

HAL_CAN_AddTxMessage(&hcan1, &txHeader, txData, &txMailbox);
\`\`\`

## Common Applications

| Domain | Use Case | Typical Speed |
|---|---|---|
| Automotive | Engine control, ABS, airbags | 500 kbps |
| Industrial | PLCs, sensor networks | 250 kbps |
| Medical | Patient monitoring equipment | 125 kbps |
| Robotics | Joint controllers, motor drives | 1 Mbps |
| Marine | NMEA 2000 (boat electronics) | 250 kbps |`,
          keyTakeaways: [
            'CAN uses priority-based arbitration — lower message ID wins bus access',
            'Differential signaling (CAN_H/CAN_L) provides noise immunity for harsh environments',
            'Classic CAN supports up to 8 bytes per frame at 1 Mbps; CAN FD extends to 64 bytes at 8 Mbps',
            'CAN has robust error handling with automatic node isolation (bus-off) and recovery',
            'MCP2515 SPI module is the easiest way to add CAN to Arduino or any SPI-capable MCU',
            'CAN is message-based (not address-based) — all nodes see all messages and filter by ID'
          ],
          videos: [
            {
              id: 'can-1',
              title: 'CAN Bus Explained',
              channel: 'CSS Electronics',
              url: 'https://www.youtube.com/watch?v=YBrU_eZM110',
              description: 'Clear explanation of CAN bus fundamentals: frames, arbitration, error handling, and practical applications.'
            },
            {
              id: 'can-2',
              title: 'CAN and CAN FD Training Part 1',
              channel: 'Intrepid Control Systems',
              url: 'https://www.youtube.com/watch?v=FqLDpHsxvf8',
              description: 'Professional CAN bus training covering both classic CAN and CAN FD with flexible data rate.'
            }
          ]
        }
      ]
    },
    {
      id: 'rtos',
      title: 'RTOS & Advanced Embedded',
      description: 'Learn real-time operating systems, DMA, low-power design, and production techniques.',
      icon: 'Layers',
      order: 5,
      subtopics: [
        {
          id: 'freertos',
          title: 'FreeRTOS',
          description: 'Implement multi-tasking on microcontrollers with FreeRTOS.',
          difficulty: 'advanced',
          estimatedTime: '6-8 hours',
          content: `# FreeRTOS

FreeRTOS is the most popular real-time operating system for microcontrollers.

## Why RTOS?

- **Multitasking**: Run multiple tasks concurrently
- **Timing guarantees**: Deterministic response times
- **Resource management**: Semaphores, mutexes, queues
- **Power management**: Idle task for sleep modes

## Creating Tasks

\`\`\`c
#include "FreeRTOS.h"
#include "task.h"

void vSensorTask(void *pvParameters) {
    for (;;) {
        // Read sensors
        int value = read_sensor();

        // Process data
        process_data(value);

        // Delay (releases CPU to other tasks)
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

void vMotorTask(void *pvParameters) {
    for (;;) {
        // Control motors
        update_motors();
        vTaskDelay(pdMS_TO_TICKS(10));  // 100Hz
    }
}

int main(void) {
    xTaskCreate(vSensorTask, "Sensor", 256, NULL, 2, NULL);
    xTaskCreate(vMotorTask, "Motor", 256, NULL, 3, NULL);

    vTaskStartScheduler();  // Never returns
    for (;;);
}
\`\`\`

## Task Priorities

Higher number = higher priority. Tasks with equal priority share time (round-robin).

| Priority | Task | Rate |
|---|---|---|
| 4 (Highest) | Safety monitor | 1kHz |
| 3 | Motor control | 100Hz |
| 2 | Sensor reading | 50Hz |
| 1 | Communication | 10Hz |
| 0 (Idle) | LED blink | 1Hz |

## Queues (Inter-task Communication)

\`\`\`c
#include "queue.h"

QueueHandle_t xSensorQueue;

void setup() {
    xSensorQueue = xQueueCreate(10, sizeof(SensorData));
}

// Producer task
void vSensorTask(void *pvParameters) {
    SensorData data;
    for (;;) {
        data.temperature = read_temp();
        data.humidity = read_humidity();
        xQueueSend(xSensorQueue, &data, portMAX_DELAY);
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

// Consumer task
void vDisplayTask(void *pvParameters) {
    SensorData data;
    for (;;) {
        if (xQueueReceive(xSensorQueue, &data, portMAX_DELAY)) {
            display_data(data.temperature, data.humidity);
        }
    }
}
\`\`\`

## Semaphores & Mutexes

\`\`\`c
#include "semphr.h"

SemaphoreHandle_t xMutex;
SemaphoreHandle_t xBinarySemaphore;

void setup() {
    xMutex = xSemaphoreCreateMutex();
    xBinarySemaphore = xSemaphoreCreateBinary();
}

// Protect shared resource
void vTask(void *pvParameters) {
    for (;;) {
        if (xSemaphoreTake(xMutex, portMAX_DELAY)) {
            // Access shared resource safely
            shared_resource_access();
            xSemaphoreGive(xMutex);
        }
    }
}

// ISR to task notification
void EXTI_IRQHandler(void) {
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;
    xSemaphoreGiveFromISR(xBinarySemaphore,
                          &xHigherPriorityTaskWoken);
    portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}
\`\`\``,
          keyTakeaways: [
            'FreeRTOS enables multi-tasking on microcontrollers',
            'Tasks have priorities — higher priority preempts lower',
            'Queues are the safest way for inter-task communication',
            'Mutexes protect shared resources from concurrent access',
            'Never block or use delays in interrupt service routines'
          ],
          videos: [
            {
              id: 'rtos-1',
              title: 'Introduction to FreeRTOS',
              channel: 'DigiKey',
              url: 'https://www.youtube.com/playlist?list=PLEBQazB0HUyQ4hAPU1cJED6t3DU0h34bz',
              description: 'DigiKey official FreeRTOS tutorial series covering all core concepts.'
            },
            {
              id: 'rtos-2',
              title: 'FreeRTOS on STM32',
              channel: 'Controllerstech',
              url: 'https://www.youtube.com/playlist?list=PLfIJKC1ud8gj1t5qBE-L7S9kNJhT2vW5C',
              description: 'Practical FreeRTOS implementation on STM32 microcontrollers.'
            }
          ]
        },
        {
          id: 'zephyr-rtos',
          title: 'Zephyr RTOS',
          description: 'Learn the Zephyr real-time operating system — the industry-backed, scalable RTOS for IoT and embedded devices.',
          difficulty: 'advanced',
          estimatedTime: '8-10 hours',
          content: `# Zephyr RTOS

## What is Zephyr?

Zephyr is a scalable, open-source real-time operating system (RTOS) backed by the Linux Foundation. It is designed for resource-constrained devices and supports 600+ boards across multiple architectures (ARM, RISC-V, x86, Xtensa, and more).

### Why Zephyr?

| Feature | FreeRTOS | Zephyr |
|---|---|---|
| Governance | Amazon (AWS) | Linux Foundation |
| Boards | Port yourself | 600+ supported |
| Networking | Add-on (lwIP) | Built-in (BLE, WiFi, LoRaWAN, Thread) |
| Build System | Makefile/CMake | West + CMake + Kconfig |
| Device Model | None | Devicetree |
| Certification | SafeRTOS (paid) | IEC 61508 SIL path |
| Complexity | Low | Higher (steeper learning curve) |
| Best For | Simple RTOS needs | Full IoT products |

### Industry Adoption

Zephyr is backed by Intel, Nordic Semiconductor, NXP, Texas Instruments, and many others. Nordic's nRF Connect SDK is built entirely on Zephyr. Google uses Zephyr in Chromebook embedded controllers.

## Architecture Overview

\`\`\`
┌─────────────────────────────────────────┐
│            Application                   │
├─────────────────────────────────────────┤
│  Networking │ Bluetooth │  USB  │ File  │
│  (TCP/UDP)  │ (BLE/Mesh)│       │System │
├─────────────────────────────────────────┤
│       Kernel (Threads, Scheduling,      │
│       Semaphores, Mutexes, Queues,      │
│       Memory Management, Timers)        │
├─────────────────────────────────────────┤
│       Hardware Abstraction (Drivers)     │
├─────────────────────────────────────────┤
│       Devicetree (Hardware Description)  │
├─────────────────────────────────────────┤
│       SoC / Board Support Package        │
└─────────────────────────────────────────┘
\`\`\`

## Build System: West, Kconfig, Devicetree

### West — The Meta-Tool

West is Zephyr's command-line meta-tool for:
- Managing multiple repositories (west manifest)
- Building applications (\`west build\`)
- Flashing firmware (\`west flash\`)
- Debugging (\`west debug\`)

\`\`\`bash
# Install Zephyr SDK and west
pip install west
west init ~/zephyrproject
cd ~/zephyrproject
west update

# Build and flash
west build -b esp32s3_devkitc samples/hello_world
west flash
\`\`\`

### Kconfig — Build-Time Configuration

Kconfig (from the Linux kernel) configures which features to include:

\`\`\`kconfig
# prj.conf — your application configuration
CONFIG_GPIO=y
CONFIG_SERIAL=y
CONFIG_BT=y
CONFIG_BT_PERIPHERAL=y
CONFIG_LOG=y
CONFIG_LOG_DEFAULT_LEVEL=3
\`\`\`

Key Kconfig files:
- \`prj.conf\` — Application-level config
- \`boards/<board>.conf\` — Board-specific overrides
- Kconfig menus browsable with \`west build -t menuconfig\`

### Devicetree — Hardware Description

Devicetree describes the hardware so drivers bind automatically:

\`\`\`dts
/* app.overlay — application hardware customization */
/ {
    aliases {
        led0 = &myled;
    };

    leds {
        compatible = "gpio-leds";
        myled: led_0 {
            gpios = <&gpio0 13 GPIO_ACTIVE_LOW>;
            label = "User LED";
        };
    };
};

&i2c0 {
    status = "okay";
    clock-frequency = <I2C_BITRATE_FAST>;

    bme280@76 {
        compatible = "bosch,bme280";
        reg = <0x76>;
    };
};
\`\`\`

## Threading Model

### Creating Threads

\`\`\`c
#include <zephyr/kernel.h>

#define STACK_SIZE 1024
#define PRIORITY   5

K_THREAD_STACK_DEFINE(my_stack, STACK_SIZE);
struct k_thread my_thread_data;

void my_thread_entry(void *p1, void *p2, void *p3) {
    while (1) {
        printk("Hello from thread!\\n");
        k_msleep(1000);
    }
}

void main(void) {
    k_thread_create(&my_thread_data, my_stack,
                    K_THREAD_STACK_SIZEOF(my_stack),
                    my_thread_entry,
                    NULL, NULL, NULL,
                    PRIORITY, 0, K_NO_WAIT);
}
\`\`\`

### Synchronization Primitives

\`\`\`c
/* Semaphore */
K_SEM_DEFINE(my_sem, 0, 1);
k_sem_give(&my_sem);       // Signal
k_sem_take(&my_sem, K_FOREVER);  // Wait

/* Mutex */
K_MUTEX_DEFINE(my_mutex);
k_mutex_lock(&my_mutex, K_FOREVER);
// ... critical section ...
k_mutex_unlock(&my_mutex);

/* Message Queue */
K_MSGQ_DEFINE(my_msgq, sizeof(struct sensor_data), 10, 4);
k_msgq_put(&my_msgq, &data, K_NO_WAIT);    // Send
k_msgq_get(&my_msgq, &data, K_FOREVER);     // Receive
\`\`\`

## Networking Stacks

Zephyr includes production-quality networking:

| Stack | Description |
|---|---|
| Bluetooth LE | Full host + controller, Mesh support |
| WiFi | Station and AP modes |
| LoRaWAN | Class A/B/C with OTAA/ABP |
| TCP/UDP/IP | Full IPv4/IPv6 networking |
| Thread/OpenThread | Mesh networking for IoT |
| MQTT | Built-in MQTT client |
| CoAP | Constrained Application Protocol |
| LwM2M | Device management protocol |

## Hello World Example

\`\`\`c
/* src/main.c */
#include <zephyr/kernel.h>
#include <zephyr/drivers/gpio.h>

#define LED0_NODE DT_ALIAS(led0)
static const struct gpio_dt_spec led = GPIO_DT_SPEC_GET(LED0_NODE, gpios);

int main(void) {
    if (!gpio_is_ready_dt(&led)) {
        return -1;
    }
    gpio_pin_configure_dt(&led, GPIO_OUTPUT_ACTIVE);

    printk("Hello World from Zephyr!\\n");
    printk("Board: %s\\n", CONFIG_BOARD);

    while (1) {
        gpio_pin_toggle_dt(&led);
        k_msleep(1000);
    }
    return 0;
}
\`\`\`

\`\`\`kconfig
# prj.conf
CONFIG_GPIO=y
CONFIG_LOG=y
\`\`\`

\`\`\`cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.20.0)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(hello_world)
target_sources(app PRIVATE src/main.c)
\`\`\`

## Supported Boards (Popular Choices)

| Board | Architecture | Notable Features |
|---|---|---|
| nRF52840 DK | ARM Cortex-M4 | BLE 5.0, Thread, USB |
| nRF5340 DK | Dual ARM Cortex-M33 | BLE 5.3, dual-core |
| ESP32-S3 DevKit | Xtensa LX7 | WiFi, BLE, AI accel |
| STM32 Nucleo series | ARM Cortex-M | Wide peripheral set |
| MIMXRT1060-EVK | ARM Cortex-M7 | NXP i.MX RT, high perf |
| BBC micro:bit v2 | ARM Cortex-M4 | Beginner-friendly |

## When to Choose Zephyr vs FreeRTOS

Choose **FreeRTOS** when:
- You need a simple, lightweight scheduler
- Your project is a single-board application
- You want minimal learning curve
- You are already using Amazon IoT services

Choose **Zephyr** when:
- You need built-in networking (BLE, WiFi, Thread, LoRaWAN)
- You want wide board support without writing BSPs
- You are building a product that needs certification paths
- You need a full-featured OS (file systems, USB, shell, logging)
- You are using Nordic nRF chips (nRF Connect SDK = Zephyr)`,
          keyTakeaways: [
            'Zephyr is a Linux Foundation-backed RTOS supporting 600+ boards and multiple architectures',
            'The build system uses West (meta-tool), CMake, Kconfig (features), and Devicetree (hardware)',
            'Zephyr includes production-quality networking: BLE, WiFi, LoRaWAN, Thread, MQTT, CoAP',
            'Devicetree separates hardware description from application code for portability',
            'Use Kconfig prj.conf to enable/disable features and tune the kernel',
            'Choose Zephyr over FreeRTOS when you need built-in networking or wide board support'
          ],
          videos: [
            {
              id: 'zephyr-1',
              title: 'Introduction to Zephyr Part 1: Getting Started',
              channel: 'DigiKey',
              url: 'https://www.youtube.com/watch?v=mTJ_vKlMS_4',
              description: '12-part series by Shawn Hymel covering Zephyr setup, Kconfig, Devicetree, debugging with OpenOCD/GDB, multithreading, interrupts, and WiFi. Uses ESP32-S3.'
            },
            {
              id: 'zephyr-2',
              title: 'Zephyr RTOS Tutorial',
              channel: 'Zephyr RTOS Deep Dive',
              url: 'https://www.youtube.com/playlist?list=PLAymxPbYHgl-FZSggEx_lRJoPU2h4tT36',
              description: 'Beginner-oriented series covering setup, tooling, workspace management, QEMU emulation, and hardware bring-up.'
            },
            {
              id: 'zephyr-3',
              title: 'Introduction to the Zephyr RTOS',
              channel: 'Linux Foundation',
              url: 'https://www.youtube.com/watch?v=jR5E5Kz9A-k',
              description: 'Official overview of Zephyr RTOS architecture, features, and ecosystem from the Linux Foundation.'
            }
          ]
        },
        {
          id: 'power-management',
          title: 'Power Management & Low-Power Design',
          description: 'Design battery-powered embedded systems with sleep modes, power budgeting, and energy harvesting techniques.',
          difficulty: 'advanced',
          estimatedTime: '4-5 hours',
          content: `# Power Management & Low-Power Design

## Why Low-Power Design?

Battery-powered embedded devices must maximize battery life. A coin cell (CR2032, 220mAh) running a sensor at 10mA lasts only 22 hours. With proper low-power design, the same battery can last years.

\`\`\`
Battery life = Battery capacity (mAh) / Average current (mA)

Example:
  CR2032: 220 mAh
  Average current: 50 µA (well-designed sensor)
  Life = 220 / 0.05 = 4,400 hours ≈ 6 months

  With 10 µA average:
  Life = 220 / 0.01 = 22,000 hours ≈ 2.5 years
\`\`\`

## Sleep Modes

### Typical MCU Power Modes

| Mode | CPU | RAM | Peripherals | Wake Time | Current (STM32L4) |
|---|---|---|---|---|---|
| Run | Active | Active | Active | — | 5-30 mA |
| Sleep | Stopped | Retained | Active | ~1 µs | 1-5 mA |
| Stop | Stopped | Retained | Most off | ~5 µs | 1-10 µA |
| Standby | Stopped | Lost | All off | ~50 µs | 0.3-1 µA |
| Shutdown | Off | Lost | Off | Boot time | 30-100 nA |

### STM32 Low-Power Example

\`\`\`c
#include "stm32l4xx_hal.h"

void enter_stop_mode(void) {
    // Disable unused peripherals
    __HAL_RCC_GPIOB_CLK_DISABLE();
    __HAL_RCC_GPIOC_CLK_DISABLE();

    // Configure wake-up source (RTC alarm or GPIO)
    HAL_RTCEx_SetWakeUpTimer_IT(&hrtc, 60,
        RTC_WAKEUPCLOCK_CK_SPRE_16BITS);  // 60 seconds

    // Enter Stop 2 mode
    HAL_SuspendTick();
    HAL_PWREx_EnterSTOP2Mode(PWR_STOPENTRY_WFI);

    // Execution resumes here after wake-up
    HAL_ResumeTick();
    SystemClock_Config();  // Reconfigure clocks
}
\`\`\`

### ESP32 Deep Sleep

\`\`\`cpp
#include "esp_sleep.h"

void enter_deep_sleep() {
    // Configure wake sources
    esp_sleep_enable_timer_wakeup(300 * 1000000);  // 5 min
    esp_sleep_enable_ext0_wakeup(GPIO_NUM_33, 0);  // Button

    // Turn off unused peripherals
    esp_wifi_stop();
    esp_bt_controller_disable();

    // Enter deep sleep (RTC memory retained)
    esp_deep_sleep_start();
    // Never reaches here — resets on wake
}
\`\`\`

## Power Budgeting

### Creating a Power Budget

A power budget estimates average current draw across all operating modes:

\`\`\`
Power Budget Example: Wireless Sensor Node

Mode         | Current | Duration | Duty Cycle | Weighted
-------------|---------|----------|------------|--------
Deep sleep   | 10 µA   | 299 s    | 99.67%     | 9.97 µA
Wake + read  | 5 mA    | 0.1 s    | 0.033%     | 1.67 µA
WiFi TX      | 200 mA  | 0.9 s    | 0.30%      | 600 µA
-------------|---------|----------|------------|--------
Average current:                                611 µA

Battery: 2× AA (3000 mAh)
Life: 3000 / 0.611 = 4,910 hours ≈ 6.8 months
\`\`\`

### Tips for Reducing Average Current

1. **Maximize sleep time** — measure less frequently if possible
2. **Batch transmissions** — store readings, send in bulk
3. **Use lowest-power sleep mode** compatible with wake requirements
4. **Disable unused peripherals** — every active peripheral draws current
5. **Reduce clock frequency** — power scales with frequency
6. **Use DMA** — let peripherals work while CPU sleeps
7. **Optimize firmware** — shorter run time = more sleep time

## Current Measurement

### Measuring Low Currents

Standard multimeters are inadequate for embedded power profiling. You need:

| Tool | Range | Resolution | Sampling | Price |
|---|---|---|---|---|
| Multimeter (basic) | mA-A | 1 mA | Manual | $20-50 |
| µCurrent | nA-mA | 1 nA | With scope | ~$50 |
| Nordic PPK2 | 200nA-1A | 100 nA | 100 kHz | ~$100 |
| Otii Arc | µA-5A | 1 µA | 4 kHz | ~$600 |
| Keysight N6705C | nA-A | 1 nA | 200 kHz | $5000+ |

### Measurement Technique

\`\`\`
Power supply → [Shunt resistor] → Device
                    │
                [Amplifier] → Oscilloscope/Logger

Shunt resistor: 1Ω to 100Ω depending on current range
  - Too high: voltage drop affects device operation
  - Too low: signal too small to measure accurately

Professional tools (PPK2, Otii) handle this automatically.
\`\`\`

## Wake Sources

| Source | Description | Use Case |
|---|---|---|
| RTC alarm | Periodic timer wake | Scheduled sensor readings |
| GPIO interrupt | External pin change | Button press, sensor alert |
| UART/I2C activity | Bus activity detection | Peripheral wake |
| Watchdog timer | Safety timer | System recovery |
| Comparator | Voltage threshold | Battery monitoring |
| BLE event | Radio wake on packet | Wireless command |

### Choosing Wake Sources

\`\`\`
Decision tree:
1. Periodic readings needed? → RTC wake
2. Event-driven? → GPIO interrupt
3. Wireless command? → BLE/radio wake
4. Multiple sources? → Combine (most MCUs support this)
\`\`\`

## Dynamic Voltage and Frequency Scaling (DVFS)

DVFS reduces power by lowering voltage and clock frequency when full performance is not needed:

\`\`\`
Power ∝ C × V² × f

Where:
  C = capacitance (fixed by hardware)
  V = supply voltage
  f = clock frequency

Halving frequency ≈ halves power
Halving voltage ≈ quarters power (V² relationship)
\`\`\`

### Practical DVFS on STM32

\`\`\`c
// STM32L4 voltage scaling ranges
// Range 1: Up to 80 MHz, higher power
// Range 2: Up to 26 MHz, lower power

// Switch to low-power range
HAL_PWREx_ControlVoltageScaling(PWR_REGULATOR_VOLTAGE_SCALE2);

// Reduce system clock
RCC_OscInitTypeDef osc = {0};
osc.OscillatorType = RCC_OSCILLATORTYPE_MSI;
osc.MSIState = RCC_MSI_ON;
osc.MSIClockRange = RCC_MSIRANGE_6;  // 4 MHz
HAL_RCC_OscConfig(&osc);
\`\`\`

## Energy Harvesting Basics

For truly maintenance-free devices, harvest ambient energy:

| Source | Typical Power | Technology | Use Case |
|---|---|---|---|
| Solar (indoor) | 10-100 µW/cm² | Small PV cell | Indoor sensors |
| Solar (outdoor) | 10-100 mW/cm² | Solar panel | Outdoor nodes |
| Vibration | 1-100 µW | Piezoelectric | Industrial machinery |
| Thermal | 10-100 µW/cm² | TEG (Peltier) | Temperature differential |
| RF | 1-100 µW | Rectenna | Near RF transmitter |

### Basic Solar Harvesting Circuit

\`\`\`
[Solar Panel] → [MPPT Charger IC] → [Supercapacitor/LiPo] → [LDO] → MCU
                  (e.g., BQ25570)

Key components:
- MPPT (Maximum Power Point Tracking) charger
- Energy storage (supercap for short-term, LiPo for long-term)
- Low-quiescent-current LDO regulator (< 1 µA)
\`\`\``,
          keyTakeaways: [
            'Battery life depends on average current — maximize sleep time to reduce it',
            'Create a power budget spreadsheet to estimate battery life before building hardware',
            'Use the deepest sleep mode compatible with your wake-up requirements',
            'Specialized tools like Nordic PPK2 are essential for accurate low-current measurement',
            'DVFS reduces power quadratically with voltage — even small voltage reductions help significantly',
            'Energy harvesting can enable maintenance-free devices with careful power budgeting'
          ],
          videos: [
            {
              id: 'power-1',
              title: 'How Low Power Modes Work + Current Measurements',
              channel: 'Texas Instruments',
              url: 'https://www.youtube.com/watch?v=BOY1lrwynJY',
              description: 'Deep dive into low power consumption modes on MSP430 with live current measurement demonstrations.'
            },
            {
              id: 'power-2',
              title: 'Low Power Embedded Systems Design',
              channel: 'Embedded Systems Academy',
              url: 'https://www.youtube.com/playlist?list=PLXP5l5Fot0G-xGXUd2eWFKpsT2ujw5zCe',
              description: 'Playlist covering practical tips and tricks for low power embedded systems design for battery-powered devices and wearables.'
            },
            {
              id: 'power-3',
              title: 'How to DESIGN an EMBEDDED SYSTEM - Schematics & Architecture',
              channel: "Phil's Lab",
              url: 'https://www.youtube.com/watch?v=DZdDwuMvvD0',
              description: 'System-level embedded design including power architecture, component selection, and power budgeting.'
            }
          ]
        }
      ]
    },
    {
      id: 'soldering-assembly',
      title: 'Soldering & Assembly',
      description: 'Learn soldering techniques for through-hole and SMD components.',
      icon: 'Flame',
      order: 6,
      subtopics: [
        {
          id: 'soldering-basics',
          title: 'Soldering Techniques',
          description: 'Master through-hole and surface-mount soldering for building electronic circuits.',
          difficulty: 'beginner',
          estimatedTime: '3-4 hours',
          content: `# Soldering Techniques

## Essential Tools

1. **Soldering Iron** (60W, temperature controlled)
2. **Solder** (60/40 or 63/37 tin-lead for beginners, lead-free for production)
3. **Flux** (rosin-core or liquid flux)
4. **Desoldering braid/pump**
5. **Helping hands / PCB holder**
6. **Tip tinner / cleaner**

## Through-Hole Soldering Steps

1. **Prepare**: Clean tip, apply small amount of solder to tip (tinning)
2. **Insert**: Push component leads through PCB holes
3. **Heat**: Touch iron to both pad and lead simultaneously
4. **Apply solder**: Feed solder to the joint (not the iron)
5. **Remove**: Pull iron away, let joint cool naturally
6. **Inspect**: Good joint is shiny and cone-shaped

### Common Mistakes

| Problem | Cause | Fix |
|---|---|---|
| Cold joint (dull, grainy) | Insufficient heat | Reheat and add flux |
| Bridge (shorts) | Too much solder | Desoldering braid |
| Lifted pad | Excessive heat/force | Be gentler, less time |
| No wetting | Dirty surfaces | Clean and apply flux |

## SMD (Surface Mount) Soldering

### Hand Soldering SMD

1. **Tin one pad** with solder
2. **Place component** with tweezers, reheat tinned pad
3. **Solder other pad(s)** normally
4. **Reflow first pad** if needed

### Hot Air Reflow

1. Apply solder paste to pads
2. Place components
3. Heat with hot air gun (300-350°C)
4. Watch solder flow and self-align

### SMD Component Sizes

| Package | Size (mm) | Difficulty |
|---|---|---|
| 2512 | 6.3 × 3.2 | Easy |
| 1206 | 3.2 × 1.6 | Easy |
| 0805 | 2.0 × 1.25 | Moderate |
| 0603 | 1.6 × 0.8 | Moderate |
| 0402 | 1.0 × 0.5 | Hard |
| 0201 | 0.6 × 0.3 | Very Hard |

## Tips for Success

- Keep soldering iron tip clean and tinned
- Use flux generously — it's your best friend
- Don't move the joint while it cools
- Practice on scrap boards first
- Good ventilation is essential (flux fumes)`,
          keyTakeaways: [
            'Heat both the pad and the lead, then apply solder to the joint',
            'A good solder joint is shiny and cone-shaped',
            'Flux is essential for clean, reliable solder joints',
            'Start with through-hole before attempting SMD soldering',
            'Practice on scrap boards before working on real projects'
          ],
          videos: [
            {
              id: 'solder-1',
              title: 'Soldering Tutorial for Beginners',
              channel: 'GreatScott!',
              url: 'https://www.youtube.com/watch?v=VxMV6wGS3NY',
              description: 'Excellent beginner soldering tutorial with practical tips and techniques.'
            },
            {
              id: 'solder-2',
              title: 'SMD Soldering Tutorial',
              channel: 'EEVblog',
              url: 'https://www.youtube.com/watch?v=b9FC9fAlfQE',
              description: 'Learn SMD soldering techniques from drag soldering to hot air reflow.'
            }
          ]
        }
      ]
    }
  ]
};
