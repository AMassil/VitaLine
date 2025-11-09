// EmergencyConnect - Main JavaScript Functionality
class EmergencyVideoSystem {
    constructor() {
        this.sessionStartTime = new Date();
        this.connectionStatus = 'connected';
        this.triageLevel = 'yellow';
        this.isAnnotationMode = false;
        this.screenshotCount = 0;
        this.vitalSigns = {
            heartRate: null,
            bloodPressure: null,
            oxygenSat: null
        };
        
        this.init();
    }
    
    init() {
        this.startSessionTimer();
        this.initializeEventListeners();
        this.simulateVideoConnection();
        this.initializeAnimations();
        this.setupVitalSignsMonitoring();
    }
    
    // Session Timer
    startSessionTimer() {
        setInterval(() => {
            const now = new Date();
            const diff = now - this.sessionStartTime;
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            
            const timerElement = document.getElementById('session-timer');
            if (timerElement) {
                timerElement.textContent = 
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    // Event Listeners
    initializeEventListeners() {
        // Emergency Escalation
        document.getElementById('emergency-escalation')?.addEventListener('click', () => {
            this.triggerEmergencyEscalation();
        });
        
        // Add Specialist
        document.getElementById('add-specialist')?.addEventListener('click', () => {
            this.addSpecialistToConference();
        });
        
        // Video Controls
        document.getElementById('mute-audio')?.addEventListener('click', (e) => {
            this.toggleAudio(e.target);
        });
        
        document.getElementById('mute-video')?.addEventListener('click', (e) => {
            this.toggleVideo(e.target);
        });
        
        // Annotation Mode
        document.getElementById('annotation-mode')?.addEventListener('click', () => {
            this.toggleAnnotationMode();
        });
        
        // Screenshot
        document.getElementById('screenshot')?.addEventListener('click', () => {
            this.takeScreenshot();
        });
        
        // Triage Level Change
        document.getElementById('triage-select')?.addEventListener('change', (e) => {
            this.updateTriageLevel(e.target.value);
        });
        
        // Update Vitals
        document.getElementById('update-vitals')?.addEventListener('click', () => {
            this.updateVitalSigns();
        });
        
        // Emergency Actions
        document.getElementById('dispatch-ambulance')?.addEventListener('click', () => {
            this.dispatchAmbulance();
        });
        
        document.getElementById('alert-specialist')?.addEventListener('click', () => {
            this.alertSpecialist();
        });
        
        document.getElementById('document-incident')?.addEventListener('click', () => {
            this.documentIncident();
        });
        
        // Patient Video Annotation
        document.getElementById('patient-video')?.addEventListener('click', (e) => {
            if (this.isAnnotationMode) {
                this.addAnnotation(e);
            }
        });
    }
    
    // Video Connection Simulation
    simulateVideoConnection() {
        const patientVideo = document.getElementById('patient-video');
        const professionalVideo = document.getElementById('professional-video');
        
        // Simulate patient video feed
        setTimeout(() => {
            if (patientVideo) {
                patientVideo.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                        <div class="text-center text-white">
                            <div class="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-4xl">👤</span>
                            </div>
                            <p class="text-lg font-medium">Patient: John Doe</p>
                            <p class="text-sm text-gray-300">Age: 45 • Male • Conscious</p>
                        </div>
                    </div>
                `;
            }
        }, 2000);
        
        // Simulate professional video feed
        setTimeout(() => {
            if (professionalVideo) {
                professionalVideo.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-green-900 to-blue-900 flex items-center justify-center">
                        <div class="text-center text-white">
                            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span class="text-xl">👨‍⚕️</span>
                            </div>
                            <p class="text-xs font-medium">Dr. Michael Smith</p>
                            <p class="text-xs text-gray-300">Emergency Physician</p>
                        </div>
                    </div>
                `;
            }
        }, 1500);
        
        // Simulate connection quality changes
        this.simulateConnectionQuality();
    }
    
    simulateConnectionQuality() {
        const qualities = ['Excellent', 'Good', 'Fair'];
        const latencies = ['15ms', '32ms', '45ms', '67ms'];
        
        setInterval(() => {
            const qualityElements = document.querySelectorAll('.connection-pulse');
            qualityElements.forEach(element => {
                const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
                const randomLatency = latencies[Math.floor(Math.random() * latencies.length)];
                
                // Update connection status
                if (element.nextElementSibling) {
                    const text = element.nextElementSibling.textContent;
                    if (text.includes('Video Quality')) {
                        element.nextElementSibling.textContent = `Video Quality: ${randomQuality}`;
                    } else if (text.includes('Latency')) {
                        element.nextElementSibling.textContent = `Latency: ${randomLatency}`;
                    }
                }
                
                // Update color based on quality
                if (randomQuality === 'Excellent') {
                    element.className = 'w-3 h-3 bg-green-500 rounded-full connection-pulse';
                } else if (randomQuality === 'Good') {
                    element.className = 'w-3 h-3 bg-yellow-500 rounded-full connection-pulse';
                } else {
                    element.className = 'w-3 h-3 bg-orange-500 rounded-full connection-pulse';
                }
            });
        }, 5000);
    }
    
    // Emergency Escalation
    triggerEmergencyEscalation() {
        const modal = this.createEmergencyModal();
        document.body.appendChild(modal);
        
        anime({
            targets: modal,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        this.addConnectionLog('EMERGENCY ESCALATION triggered', 'red');
        this.sendNotification('Emergency escalation activated!', 'critical');
    }
    
    createEmergencyModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">🚨</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Emergency Escalation Activated</h3>
                    <p class="text-gray-600 mb-6">Additional emergency resources have been notified and are being dispatched.</p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center space-x-3 text-sm">
                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Advanced Life Support Unit dispatched</span>
                        </div>
                        <div class="flex items-center space-x-3 text-sm">
                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Specialist team notified</span>
                        </div>
                        <div class="flex items-center space-x-3 text-sm">
                            <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Receiving hospital alerted</span>
                        </div>
                    </div>
                    
                    <button class="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Close Alert
                    </button>
                </div>
            </div>
        `;
        return modal;
    }
    
    // Add Specialist to Conference
    addSpecialistToConference() {
        const specialists = [
            'Dr. Sarah Johnson - Cardiologist',
            'Dr. Robert Chen - Neurologist',
            'Dr. Emily Rodriguez - Trauma Surgeon',
            'Dr. Michael Thompson - Anesthesiologist'
        ];
        
        const randomSpecialist = specialists[Math.floor(Math.random() * specialists.length)];
        
        const notification = this.createNotification(`${randomSpecialist} has joined the conference`, 'success');
        document.body.appendChild(notification);
        
        this.addConnectionLog(`Specialist added: ${randomSpecialist}`, 'blue');
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
    
    // Audio/Video Controls
    toggleAudio(button) {
        const isMuted = button.classList.contains('bg-red-600');
        
        if (isMuted) {
            button.classList.remove('bg-red-600');
            button.classList.add('bg-black', 'bg-opacity-50');
            button.textContent = '🎤';
            this.addConnectionLog('Audio unmuted', 'green');
        } else {
            button.classList.remove('bg-black', 'bg-opacity-50');
            button.classList.add('bg-red-600');
            button.textContent = '🎤🔇';
            this.addConnectionLog('Audio muted', 'yellow');
        }
    }
    
    toggleVideo(button) {
        const isMuted = button.classList.contains('bg-red-600');
        
        if (isMuted) {
            button.classList.remove('bg-red-600');
            button.classList.add('bg-black', 'bg-opacity-50');
            button.textContent = '📹';
            this.addConnectionLog('Video enabled', 'green');
        } else {
            button.classList.remove('bg-black', 'bg-opacity-50');
            button.classList.add('bg-red-600');
            button.textContent = '📹🔇';
            this.addConnectionLog('Video disabled', 'yellow');
        }
    }
    
    // Annotation Mode
    toggleAnnotationMode() {
        this.isAnnotationMode = !this.isAnnotationMode;
        const button = document.getElementById('annotation-mode');
        const patientVideo = document.getElementById('patient-video');
        
        if (this.isAnnotationMode) {
            button.classList.remove('bg-black', 'bg-opacity-50');
            button.classList.add('bg-blue-600');
            patientVideo.classList.add('annotation-tool');
            this.addConnectionLog('Annotation mode enabled', 'blue');
            this.showAnnotationInstructions();
        } else {
            button.classList.remove('bg-blue-600');
            button.classList.add('bg-black', 'bg-opacity-50');
            patientVideo.classList.remove('annotation-tool');
            this.addConnectionLog('Annotation mode disabled', 'gray');
        }
    }
    
    showAnnotationInstructions() {
        const instructions = document.createElement('div');
        instructions.className = 'fixed top-20 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-40';
        instructions.innerHTML = `
            <p class="text-sm font-medium">✏️ Annotation Mode Active</p>
            <p class="text-xs mt-1">Click on video to add annotations</p>
        `;
        document.body.appendChild(instructions);
        
        setTimeout(() => {
            instructions.remove();
        }, 3000);
    }
    
    addAnnotation(event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const annotation = document.createElement('div');
        annotation.className = 'absolute w-4 h-4 bg-red-500 rounded-full pointer-events-none animate-ping';
        annotation.style.left = `${x - 8}px`;
        annotation.style.top = `${y - 8}px`;
        
        event.target.appendChild(annotation);
        
        setTimeout(() => {
            annotation.classList.remove('animate-ping');
            annotation.classList.add('bg-yellow-500');
        }, 1000);
        
        this.addConnectionLog(`Annotation added at (${Math.round(x)}, ${Math.round(y)})`, 'yellow');
    }
    
    // Screenshot Functionality
    takeScreenshot() {
        const flash = document.getElementById('screenshot-flash');
        flash.classList.add('screenshot-flash');
        
        setTimeout(() => {
            flash.classList.remove('screenshot-flash');
        }, 300);
        
        this.screenshotCount++;
        this.addConnectionLog(`Screenshot #${this.screenshotCount} captured`, 'blue');
        this.sendNotification('Screenshot captured and saved to medical record', 'success');
    }
    
    // Triage Level Management
    updateTriageLevel(level) {
        this.triageLevel = level;
        const emergencyLevelElement = document.getElementById('emergency-level');
        
        const triageConfig = {
            red: { text: 'LEVEL 1 - IMMEDIATE', class: 'bg-red-100 text-red-800' },
            yellow: { text: 'LEVEL 2 - URGENT', class: 'bg-yellow-100 text-yellow-800' },
            green: { text: 'LEVEL 3 - DELAYED', class: 'bg-green-100 text-green-800' }
        };
        
        const config = triageConfig[level];
        emergencyLevelElement.textContent = config.text;
        emergencyLevelElement.className = `px-3 py-1 ${config.class} rounded-full text-sm font-medium`;
        
        this.addConnectionLog(`Triage level updated to ${config.text}`, level);
    }
    
    // Vital Signs Management
    updateVitalSigns() {
        const heartRate = document.getElementById('heart-rate').value;
        const bloodPressure = document.getElementById('blood-pressure').value;
        const oxygenSat = document.getElementById('oxygen-sat').value;
        
        if (heartRate || bloodPressure || oxygenSat) {
            this.vitalSigns = {
                heartRate: heartRate || this.vitalSigns.heartRate,
                bloodPressure: bloodPressure || this.vitalSigns.bloodPressure,
                oxygenSat: oxygenSat || this.vitalSigns.oxygenSat
            };
            
            this.addConnectionLog('Vital signs updated', 'green');
            this.sendNotification('Vital signs recorded in patient record', 'success');
            
            // Clear inputs
            document.getElementById('heart-rate').value = '';
            document.getElementById('blood-pressure').value = '';
            document.getElementById('oxygen-sat').value = '';
        }
    }
    
    setupVitalSignsMonitoring() {
        // Simulate automatic vital signs detection
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance of automatic reading
                const simulatedHR = Math.floor(Math.random() * 60) + 60; // 60-120 bpm
                const simulatedBP = `${Math.floor(Math.random() * 40) + 120}/${Math.floor(Math.random() * 30) + 70}`;
                const simulatedO2 = Math.floor(Math.random() * 5) + 95; // 95-100%
                
                this.addConnectionLog(`Auto-detected: HR ${simulatedHR} bpm, BP ${simulatedBP}, O2 ${simulatedO2}%`, 'blue');
            }
        }, 15000);
    }
    
    // Emergency Actions
    dispatchAmbulance() {
        const modal = this.createDispatchModal();
        document.body.appendChild(modal);
        
        anime({
            targets: modal,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        this.addConnectionLog('Ambulance dispatch requested', 'red');
    }
    
    createDispatchModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">🚑</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Ambulance Dispatch</h3>
                    <p class="text-gray-600 mb-6">Emergency medical services have been notified and are en route.</p>
                    
                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="font-medium">ETA:</span>
                                <span class="text-blue-600">8 minutes</span>
                            </div>
                            <div>
                                <span class="font-medium">Unit:</span>
                                <span class="text-blue-600">Medic 42</span>
                            </div>
                            <div>
                                <span class="font-medium">Distance:</span>
                                <span class="text-blue-600">3.2 miles</span>
                            </div>
                            <div>
                                <span class="font-medium">Crew:</span>
                                <span class="text-blue-600">2 EMTs</span>
                            </div>
                        </div>
                    </div>
                    
                    <button class="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Track Ambulance
                    </button>
                </div>
            </div>
        `;
        return modal;
    }
    
    alertSpecialist() {
        const specialists = [
            'Dr. Sarah Johnson - Cardiology',
            'Dr. Robert Chen - Neurology',
            'Dr. Emily Rodriguez - Trauma Surgery',
            'Dr. Michael Thompson - Anesthesiology'
        ];
        
        const randomSpecialist = specialists[Math.floor(Math.random() * specialists.length)];
        
        const notification = this.createNotification(`${randomSpecialist} has been notified and will join within 2 minutes`, 'info');
        document.body.appendChild(notification);
        
        this.addConnectionLog(`Specialist alert sent: ${randomSpecialist}`, 'yellow');
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    documentIncident() {
        const timestamp = new Date().toISOString();
        this.addConnectionLog(`Incident documented at ${timestamp}`, 'green');
        this.sendNotification('Incident documented and saved to medical record', 'success');
    }
    
    // Utility Functions
    addConnectionLog(message, type = 'gray') {
        const logElement = document.getElementById('connection-log');
        if (!logElement) return;
        
        const timestamp = new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        const colorMap = {
            red: 'text-red-600',
            yellow: 'text-yellow-600',
            green: 'text-green-600',
            blue: 'text-blue-600',
            gray: 'text-gray-600'
        };
        
        const logEntry = document.createElement('div');
        logEntry.className = `text-sm ${colorMap[type]} mono`;
        logEntry.innerHTML = `
            <span class="text-gray-400">[${timestamp}]</span> ${message}
        `;
        
        logElement.appendChild(logEntry);
        logElement.scrollTop = logElement.scrollHeight;
        
        // Keep only last 20 entries
        while (logElement.children.length > 20) {
            logElement.removeChild(logElement.firstChild);
        }
    }
    
    createNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-40 max-w-sm`;
        
        const typeConfig = {
            success: 'bg-green-600 text-white',
            error: 'bg-red-600 text-white',
            warning: 'bg-yellow-600 text-white',
            info: 'bg-blue-600 text-white',
            critical: 'bg-red-700 text-white border-2 border-red-900'
        };
        
        notification.className += ` ${typeConfig[type]}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    ${this.getNotificationIcon(type)}
                </div>
                <div class="text-sm font-medium">${message}</div>
            </div>
        `;
        
        return notification;
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            critical: '🚨'
        };
        return icons[type] || 'ℹ️';
    }
    
    sendNotification(message, type) {
        const notification = this.createNotification(message, type);
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => notification.remove()
            });
        }, 4000);
    }
    
    // Initialize Animations
    initializeAnimations() {
        // Animate page load
        anime({
            targets: '.medical-card',
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });
        
        // Animate navigation
        anime({
            targets: 'nav',
            translateY: [-20, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutQuart'
        });
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const emergencySystem = new EmergencyVideoSystem();
    
    // Add some initial connection logs
    setTimeout(() => {
        emergencySystem.addConnectionLog('System initialized successfully', 'green');
        emergencySystem.addConnectionLog('Emergency protocols loaded', 'blue');
        emergencySystem.addConnectionLog('Ready for emergency consultation', 'green');
    }, 1000);
});

// Add some global utility functions for cross-page functionality
window.EmergencyConnect = {
    addConnectionLog: (message, type) => {
        const system = new EmergencyVideoSystem();
        system.addConnectionLog(message, type);
    },
    sendNotification: (message, type) => {
        const system = new EmergencyVideoSystem();
        system.sendNotification(message, type);
    }
};