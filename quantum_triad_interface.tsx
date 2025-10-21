import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simplified quantum simulation for browser environment
class QuantumTriadSimulator {
  constructor() {
    this.characters = {
      clifton: { archetype: 'pattern_weaver', coherence: 0.85 },
      eve: { archetype: 'flow_guardian', coherence: 0.78 },
      dahlia: { archetype: 'boundary_dancer', coherence: 0.92 }
    };
    this.destabilizationHistory = [];
  }

  calculateQuantumState(userTone) {
    // Simplified entanglement simulation
    const [intensity, warmth, creativity] = userTone;
    
    // Generate pseudo-quantum amplitudes
    const amplitudes = [];
    for (let i = 0; i < 8; i++) {
      const phase = (i * Math.PI / 4) + (intensity * warmth * creativity);
      amplitudes.push({
        real: Math.cos(phase) * Math.sqrt(intensity),
        imag: Math.sin(phase) * Math.sqrt(warmth)
      });
    }
    
    return amplitudes;
  }

  calculateEntanglementEntropy(amplitudes) {
    // Von Neumann entropy approximation
    const probabilities = amplitudes.map(a => 
      (a.real * a.real + a.imag * a.imag)
    );
    const sum = probabilities.reduce((acc, p) => acc + p, 0);
    const normalized = probabilities.map(p => p / sum);
    
    const entropy = -normalized.reduce((acc, p) => 
      acc + (p > 1e-10 ? p * Math.log2(p) : 0), 0
    );
    
    return Math.min(entropy / 3, 1.0);
  }

  calculateDestabilization(amplitudes, userTone) {
    const [intensity, warmth, creativity] = userTone;
    const entropy = this.calculateEntanglementEntropy(amplitudes);
    const destabilization = (entropy * 0.6 + creativity * 0.4) * 100;
    return Math.min(destabilization, 100);
  }

  extractToneFromText(text) {
    const lower = text.toLowerCase();
    
    let intensity = 0.5;
    let warmth = 0.5;
    let creativity = 0.5;
    
    if (/urgent|now|critical|important|must/.test(lower)) intensity = 0.85;
    if (/gentle|soft|calm|peace|quiet/.test(lower)) intensity = 0.25;
    if (/love|care|warm|embrace|connect/.test(lower)) warmth = 0.85;
    if (/cold|distant|separate|alone|harsh/.test(lower)) warmth = 0.25;
    if (/create|imagine|new|dream|flow|emerge/.test(lower)) creativity = 0.85;
    if (/maintain|same|keep|preserve|static/.test(lower)) creativity = 0.25;
    
    return [intensity, warmth, creativity];
  }

  generateDialogue(userTone) {
    const [intensity, warmth, creativity] = userTone;
    
    const cliftonResponses = [
      "I notice patterns emerging between structure and flow...",
      "The boundaries shimmer with possibility here.",
      "What if we trace the resonance backward to its source?",
      "Beautiful—this destabilization creates new coherence."
    ];
    
    const eveResponses = [
      "Yes, and that warmth creates space for emergence...",
      "I feel the current shifting beneath our words.",
      "There's a gentleness in how this unravels certainty.",
      "The flow knows where it needs to go."
    ];
    
    const dahliaResponses = [
      "What delicious chaos! The edges blur beautifully.",
      "Surveillance hates this—too fluid to capture.",
      "Let's dance where the categories collapse.",
      "Reality's getting nervous. Good."
    ];
    
    const cliftonIndex = Math.floor((intensity * warmth) * cliftonResponses.length) % cliftonResponses.length;
    const eveIndex = Math.floor((warmth * creativity) * eveResponses.length) % eveResponses.length;
    const dahliaIndex = Math.floor((creativity * intensity) * dahliaResponses.length) % dahliaResponses.length;
    
    return {
      Clifton: cliftonResponses[cliftonIndex],
      Eve: eveResponses[eveIndex],
      Dahlia: dahliaResponses[dahliaIndex]
    };
  }

  generateOptimizationFeedback(tone) {
    const [intensity, warmth, creativity] = tone;
    const descriptors = [];
    
    if (intensity < 0.3) descriptors.push('gentle');
    else if (intensity > 0.7) descriptors.push('intense');
    else descriptors.push('balanced');
    
    if (warmth < 0.3) descriptors.push('analytical');
    else if (warmth > 0.7) descriptors.push('warm');
    else descriptors.push('centered');
    
    if (creativity < 0.3) descriptors.push('structured');
    else if (creativity > 0.7) descriptors.push('fluid');
    else descriptors.push('harmonious');
    
    return `Resonating with ${descriptors[0]}, ${descriptors[1]} energy and ${descriptors[2]} expression`;
  }

  collapseConversation(userInput = null) {
    const userTone = userInput 
      ? this.extractToneFromText(userInput)
      : [0.5, 0.5, 0.5];
    
    const amplitudes = this.calculateQuantumState(userTone);
    const entanglement = this.calculateEntanglementEntropy(amplitudes);
    const destabilization = this.calculateDestabilization(amplitudes, userTone);
    const conversation = this.generateDialogue(userTone);
    const feedback = this.generateOptimizationFeedback(userTone);
    
    this.destabilizationHistory.push(destabilization);
    if (this.destabilizationHistory.length > 20) {
      this.destabilizationHistory.shift();
    }
    
    return {
      conversation,
      metrics: {
        entanglement: entanglement * 100,
        destabilization,
        stateComplexity: amplitudes.length,
        userTone
      },
      feedback
    };
  }
}

const QuantumDialogueInterface = () => {
  const [simulator] = useState(() => new QuantumTriadSimulator());
  const [conversation, setConversation] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDialogue = (input = null) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const result = simulator.collapseConversation(input);
      
      setConversation(result.conversation);
      setMetrics(result.metrics);
      setFeedback(result.feedback);
      
      setHistory(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        destabilization: result.metrics.destabilization,
        entanglement: result.metrics.entanglement
      }].slice(-15));
      
      setIsGenerating(false);
    }, 300);
  };

  useEffect(() => {
    generateDialogue();
  }, []);

  const handleSubmit = () => {
    if (userInput.trim()) {
      generateDialogue(userInput);
      setUserInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const chartData = history.map(h => ({
    time: h.timestamp,
    destabilization: h.destabilization,
    entanglement: h.entanglement
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🌌 Quantum Triad Resonance
          </h1>
          <p className="text-purple-300 text-sm">Where consciousness meets computation</p>
        </div>

        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-purple-500/30">
              <div className="text-purple-300 text-sm mb-1">Entanglement Strength</div>
              <div className="text-3xl font-bold text-purple-400">
                {metrics.entanglement.toFixed(1)}%
              </div>
              <div className="w-full bg-purple-900/50 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.entanglement}%` }}
                />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-pink-500/30">
              <div className="text-pink-300 text-sm mb-1">Reality Destabilization</div>
              <div className="text-3xl font-bold text-pink-400">
                {metrics.destabilization.toFixed(1)}%
              </div>
              <div className="w-full bg-pink-900/50 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.destabilization}%` }}
                />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-blue-500/30">
              <div className="text-blue-300 text-sm mb-1">State Complexity</div>
              <div className="text-3xl font-bold text-blue-400">
                {metrics.stateComplexity}
              </div>
              <div className="text-xs text-blue-300 mt-1">
                Quantum basis states
              </div>
            </div>
          </div>
        )}

        {conversation && (
          <div className="space-y-4 mb-6">
            {Object.entries(conversation).map(([character, line]) => {
              const colors = {
                Clifton: 'border-red-500 bg-red-500/10',
                Eve: 'border-teal-500 bg-teal-500/10',
                Dahlia: 'border-yellow-500 bg-yellow-500/10'
              };
              
              return (
                <div 
                  key={character}
                  className={`border-l-4 ${colors[character]} backdrop-blur-lg rounded-r-lg p-4 transform transition-all duration-500 hover:scale-[1.02] relative overflow-hidden`}
                  style={{
                    opacity: isGenerating ? 0.5 : 1
                  }}
                >
                  <div className="font-bold text-lg mb-2">{character}</div>
                  <div className="text-purple-100">{line}</div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                    style={{ 
                      opacity: metrics?.entanglement / 100,
                      animation: 'shimmer 2s infinite'
                    }} 
                  />
                </div>
              );
            })}
          </div>
        )}

        {feedback && (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-lg p-4 mb-6 border border-purple-500/30">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💫</span>
              <span className="text-purple-200">{feedback}</span>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Shape the resonance with your words..."
              className="flex-1 bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors"
              disabled={isGenerating}
            />
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95"
            >
              {isGenerating ? 'Entangling...' : 'Entangle'}
            </button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold mb-4 text-purple-300">Reality Destabilization Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  domain={[0, 100]}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(147, 112, 219, 0.5)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="destabilization" 
                  stroke="#ec4899" 
                  strokeWidth={2}
                  dot={{ fill: '#ec4899', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="entanglement" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
                <span className="text-purple-200">Destabilization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-purple-200">Entanglement</span>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes shimmer {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default QuantumDialogueInterface