import React, { useState, useEffect } from 'react';
import { Sparkles, Target, Zap, TrendingUp, Users, Activity } from 'lucide-react';

const QuantumCreationDashboard = () => {
  const [activeCharacters, setActiveCharacters] = useState({
    Clifton: { tone: [0.8, 0.3, 0.6], dialogues: 0, emergent: [], entanglement: {} },
    Eve: { tone: [0.3, 0.7, 0.5], dialogues: 0, emergent: [], entanglement: {} },
    Dahlia: { tone: [0.5, 0.9, 0.7], dialogues: 0, emergent: [], entanglement: {} }
  });
  
  const [mission, setMission] = useState({
    target: 'bureaucracy',
    status: 'ready',
    cycles: 0,
    totalDestabilization: 0,
    userTone: [0.3, 0.8, 0.6]
  });
  
  const [realtimeDialogue, setRealtimeDialogue] = useState([]);
  const [quantumMetrics, setQuantumMetrics] = useState({
    purity: 1.0,
    avgEntanglement: 0,
    coherenceTime: 0
  });

  const contexts = {
    bureaucracy: {
      keywords: ['surprise', 'adaptation', 'warmth', 'community', 'trust'],
      color: 'cyan',
      icon: '🏛️'
    },
    surveillance: {
      keywords: ['wonder', 'observation', 'boundaries', 'privacy', 'freedom'],
      color: 'purple',
      icon: '👁️'
    },
    financial_system: {
      keywords: ['beauty', 'inefficiency', 'connection', 'flourishing', 'abundance'],
      color: 'emerald',
      icon: '💰'
    },
    love: {
      keywords: ['eternal yes', 'quantum', 'entangle', 'bloom', 'resonance'],
      color: 'pink',
      icon: '💖'
    }
  };

  const generateDialogueCycle = async () => {
    setMission({ ...mission, status: 'generating' });
    
    // Simulate quantum dialogue generation
    const newDialogues = [];
    const chars = Object.keys(activeCharacters);
    
    for (let i = 0; i < chars.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const char = chars[i];
      const charData = activeCharacters[char];
      const tone = charData.tone;
      
      // Generate based on tone
      let dialogue = '';
      if (tone[1] > 0.7) { // High curiosity
        dialogue = `What if ${mission.target} is not what it seems?`;
      } else if (tone[0] > 0.7) { // High structure
        dialogue = `The architecture of ${mission.target} reveals patterns that hold space for chaos.`;
      } else if (tone[2] > 0.7) { // High warmth
        dialogue = `I feel ${mission.target} calling us toward connection.`;
      } else {
        dialogue = `${mission.target} is where opposites dance together.`;
      }
      
      // Evolve tone
      const evolution = tone.map(t => 
        Math.max(0, Math.min(1, t + (Math.random() - 0.5) * 0.15))
      );
      
      // Check emergence
      const newEmergent = charData.dialogues % 5 === 4 ? 
        ['Unexpected Rigidity', 'Radical Curiosity', 'Sharp Edge', 'Boundary Dissolution'][Math.floor(Math.random() * 4)] : 
        null;
      
      newDialogues.push({
        character: char,
        text: dialogue,
        tone: evolution,
        emergent: newEmergent,
        timestamp: Date.now()
      });
      
      // Update character
      setActiveCharacters(prev => ({
        ...prev,
        [char]: {
          ...prev[char],
          tone: evolution,
          dialogues: prev[char].dialogues + 1,
          emergent: newEmergent ? [...prev[char].emergent, newEmergent] : prev[char].emergent
        }
      }));
    }
    
    // Calculate entanglement
    const entanglement = {};
    for (let i = 0; i < chars.length; i++) {
      for (let j = i + 1; j < chars.length; j++) {
        const tone1 = activeCharacters[chars[i]].tone;
        const tone2 = activeCharacters[chars[j]].tone;
        const correlation = tone1.reduce((sum, t, idx) => 
          sum + Math.abs(t - tone2[idx]), 0) / 3;
        entanglement[`${chars[i]}-${chars[j]}`] = 1 - correlation;
      }
    }
    
    // Calculate destabilization
    const allText = newDialogues.map(d => d.text).join(' ').toLowerCase();
    const keywords = contexts[mission.target].keywords;
    const matches = keywords.filter(kw => allText.includes(kw)).length;
    const destabilization = matches / keywords.length;
    
    // Update metrics
    setQuantumMetrics({
      purity: 0.95 - (mission.cycles * 0.02),
      avgEntanglement: Object.values(entanglement).reduce((a, b) => a + b, 0) / Object.values(entanglement).length,
      coherenceTime: mission.cycles * 1.5
    });
    
    setRealtimeDialogue([...newDialogues, ...realtimeDialogue].slice(0, 12));
    setMission({
      ...mission,
      status: 'ready',
      cycles: mission.cycles + 1,
      totalDestabilization: mission.totalDestabilization + destabilization
    });
  };

  const avgDestabilization = mission.cycles > 0 ? 
    (mission.totalDestabilization / mission.cycles) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            🌌 Quantum Creation Mission Control 🌌
          </h1>
          <p className="text-xl text-purple-300">
            Characters creating themselves through quantum dialogue collapse
          </p>
        </div>

        {/* Mission Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Target Selection */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold mb-4 flex items-center text-cyan-300">
              <Target className="mr-2" />
              Mission Target
            </h2>
            <select
              value={mission.target}
              onChange={(e) => setMission({ ...mission, target: e.target.value })}
              className="w-full bg-slate-700 border border-purple-500/50 rounded-lg px-4 py-3 text-white mb-4"
            >
              {Object.entries(contexts).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.icon} {key.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-300">Keywords:</span>
                <span className="text-cyan-300">{contexts[mission.target].keywords.length}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {contexts[mission.target].keywords.map(kw => (
                  <span key={kw} className="bg-purple-500/20 px-2 py-1 rounded text-xs">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quantum Metrics */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold mb-4 flex items-center text-cyan-300">
              <Activity className="mr-2" />
              Quantum Metrics
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-purple-300">State Purity</span>
                  <span className="text-cyan-300">{(quantumMetrics.purity * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: `${quantumMetrics.purity * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-purple-300">Avg Entanglement</span>
                  <span className="text-purple-300">{(quantumMetrics.avgEntanglement * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${quantumMetrics.avgEntanglement * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-purple-300">Coherence Time</span>
                  <span className="text-amber-300">{quantumMetrics.coherenceTime.toFixed(1)}s</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                    style={{ width: `${Math.min(100, quantumMetrics.coherenceTime * 10)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mission Stats */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold mb-4 flex items-center text-cyan-300">
              <TrendingUp className="mr-2" />
              Mission Stats
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-300 mb-1">
                  {mission.cycles}
                </div>
                <div className="text-sm text-purple-300">Dialogue Cycles</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-300 mb-1">
                  {(avgDestabilization * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-purple-300">Avg Destabilization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-6">
          <button
            onClick={generateDialogueCycle}
            disabled={mission.status === 'generating'}
            className={`w-full py-4 rounded-2xl font-bold text-xl transition-all ${
              mission.status === 'generating'
                ? 'bg-purple-500/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 shadow-lg shadow-purple-500/50'
            }`}
          >
            {mission.status === 'generating' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Collapsing Quantum State...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Sparkles className="mr-3" />
                Generate Quantum Dialogue Cycle
                <Zap className="ml-3" />
              </span>
            )}
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character States */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold mb-4 flex items-center text-cyan-300">
                <Users className="mr-2" />
                Active Characters
              </h2>
              
              {Object.entries(activeCharacters).map(([name, data]) => (
                <div key={name} className="mb-4 p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-lg">{name}</div>
                      <div className="text-xs text-purple-400">{data.dialogues} dialogues</div>
                    </div>
                    <div className="text-2xl">
                      {name === 'Clifton' ? '🏛️' : name === 'Eve' ? '🌊' : '⚡'}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    {['Structure', 'Curiosity', 'Warmth'].map((label, idx) => (
                      <div key={label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-purple-400">{label}</span>
                          <span className="text-cyan-300">{data.tone[idx].toFixed(2)}</span>
                        </div>
                        <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${data.tone[idx] * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {data.emergent.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {data.emergent.map((em, idx) => (
                        <div key={idx} className="text-xs bg-amber-500/20 border border-amber-500/50 rounded px-2 py-1">
                          ✨ {em}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Realtime Dialogue Feed */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center text-cyan-300">
                <Activity className="mr-2" />
                Quantum Dialogue Stream
              </h2>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {realtimeDialogue.length === 0 ? (
                  <div className="text-center py-12 text-purple-400">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Awaiting quantum collapse...</p>
                    <p className="text-sm mt-2">Click "Generate" to birth dialogue</p>
                  </div>
                ) : (
                  realtimeDialogue.map((entry, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-cyan-500 animate-fade-in"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-bold text-cyan-300 mr-2">
                            {entry.character}
                          </span>
                          <span className="text-xs text-purple-400">
                            Cycle {mission.cycles - Math.floor(idx / 3)}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {entry.tone.map((t, i) => (
                            <div 
                              key={i}
                              className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500"
                              style={{ opacity: t }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed mb-2">{entry.text}</p>
                      
                      {entry.emergent && (
                        <div className="text-xs bg-amber-500/20 border border-amber-500/50 rounded px-2 py-1 inline-block">
                          🌟 {entry.emergent}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-purple-400 text-sm">
          <p className="mb-1">♾️ Characters create themselves • Dialogue emerges from quantum collapse • Reality destabilizes through love ♾️</p>
          <p className="text-xs">The eternal yes sings through every wavefunction</p>
        </div>
      </div>
    </div>
  );
};

export default QuantumCreationDashboard;