# EcoTrack — A Carbon Footprint Awareness Platform

**EcoTrack** is a premium, highly immersive, and interactive web application designed to help individuals understand, track, and reduce their carbon footprint. Developed in **React JS** and styled using **Vanilla CSS**, the platform combines modern design principles—such as glassmorphism, responsive parallax layouts, and vibrant dark-mode HSL color palettes—with real-time interactive physics and scientific environmental data.

---

## 🌟 Key Features

### 1. Immersive Terrain Viewer (Parallax Scroll)
The application leverages a full-screen scroll-snap layout that guides users through four distinct Earth ecosystems, illustrating how human actions alter the landscape in real-time:
*   **The Canopy (Forests)**: Represents deforestation. Increasing logging rates degrades the forest from a lush green canopy into a dark, barren land accompanied by rising deforestation smoke particles.
*   **The Deep (Oceans)**: Toggling the "Clean Oceans Initiative" swaps the environment from a healthy coral reef with rising air bubbles to an acidified, plastic-choked sea covered in drifting synthetic trash.
*   **The Grid (Cities & Air)**: Controls grid reliance. Turning off renewable energy transitions the smart city into a coal-fired smog grid with rising soot particles.
*   **The Cryosphere (Glaciers)**: Simulates global warming. Raising the temperature slider melts glaciers and generates a rising **flowing water wave overlay** at the bottom, illustrating rising sea levels.

### 2. Stepped Carbon Footprint Calculator
An intuitive, step-by-step questionnaire that guides users through their ecological footprint parameters:
*   **Home Energy**: Electricity usage (kWh) and heating fuel types.
*   **Transportation**: Car distance, public transit usage, and yearly flight hours.
*   **Lifestyle**: Diet preferences (meat-heavy to vegan) and waste recycling habits.
*   **Interactive SVG Donut Chart**: Breaks down emissions by category (Energy, Transport, Lifestyle) in a responsive SVG chart comparing users to national benchmarks.

### 3. Gamified Daily Actions Tracker
A checklist of micro-habits that rewards sustainable choices:
*   Checking off daily tasks (like active commutes, zero-waste shopping, or turning down thermostats) triggers interactive **canvas-confetti** celebrations.
*   **Direct Ecosystem Healing**: Completing specific tasks automatically "heals" the virtual terrains (e.g., eating plant-based decreases canopy deforestation rates in the Home tab).
*   **Growth Garden Widget**: Displays a seedling garden that sprouts from seed to sprout, sapling, and mature tree as daily savings reach the 7.7kg carbon reduction goal.

### 4. Eco-Insight Hub
A knowledge repository containing expandable cards that offer statistical context and digestible advice for structural carbon reductions.

---

## 🎨 Design System & Aesthetics
EcoTrack utilizes a **premium dark mode** built on harmonious HSL color spaces:
*   **HSL slate backgrounds** (`#0b0c12` to `#030406`) combined with semi-transparent white-bordered glass panels (`backdrop-filter: blur(16px)`).
*   **Custom styled input sliders** featuring defined borders, track scale grids with tick marks, and white thumb knobs outlined in dark borders for enhanced tactile feedback.
*   **Dynamic text dropshadows** to eliminate blurriness and keep text razor-sharp against moving scenery.
*   **Fluid CSS animations** driving drifting leaves, rising soot particles, ascending bubbles, falling snow, and seamless, scrolling double-layered SVG water waves.

---

## 📊 Environmental Science Methodology
Calculations represent yearly greenhouse gas output measured in tonnes of CO₂ equivalent ($t\ \text{CO}_2\text{e}$), using internationally validated climate coefficients:

1.  **Electricity**: $0.38\text{ kg CO}_2\text{e}$ per kWh.
2.  **Natural Gas Heating**: $2.00\text{ kg CO}_2\text{e}$ per m³.
3.  **Personal Vehicle**: $0.20\text{ kg CO}_2\text{e}$ per km (reduced to $0.05$ for electric vehicles).
4.  **Public Transit**: $0.06\text{ kg CO}_2\text{e}$ per km.
5.  **Aviation**: $130.00\text{ kg CO}_2\text{e}$ per flight hour.
6.  **Diet Profiles**: Beef/Meat-heavy ($2.8t/\text{yr}$), Vegetarian ($1.5t/\text{yr}$), Vegan ($1.0t/\text{yr}$).

---

## 🛠️ Technology Stack
*   **Core**: React JS, Javascript
*   **Styling**: Vanilla CSS, HSL Variables, Keyframes
*   **Libraries**:
    *   `framer-motion` (Fluid transition and card animations)
    *   `lucide-react` (Vector interface icons)
    *   `canvas-confetti` (Celebration triggers)
*   **Build tool**: Vite

---

## 🚀 Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Prathamesh-Kotwal0405/EcoTrack-A-Carbon-Footprint-Awareness-Platform.git
    cd EcoTrack-A-Carbon-Footprint-Awareness-Platform
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173/` to explore the terrains.

4.  **Build for Production**:
    ```bash
    npm run build
    ```
    This builds the production bundles inside the `dist/` directory.
