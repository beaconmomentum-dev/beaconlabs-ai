import React from 'react';

const AiCooService = () => {
  return (
    <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg p-8 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#e8e0d0] mb-2">The AI COO System</h3>
          <p className="text-[#8a9bb0] text-lg">Your brutal, unvarnished accountability partner.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#c9a84c]">$997</div>
          <div className="text-sm text-[#5a7a8a] uppercase tracking-wider mt-1">One-Time Setup</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-[#c9a84c] font-semibold mb-3">The Problem</h4>
          <p className="text-[#c8d8e8] leading-relaxed">
            As a solopreneur, you have no boss, no board, and no one to tell you when you're wasting time on low-leverage tasks. You can lie to yourself about how productive your week was. You can't lie to your data.
          </p>
        </div>
        <div>
          <h4 className="text-[#c9a84c] font-semibold mb-3">The Solution</h4>
          <p className="text-[#c8d8e8] leading-relaxed">
            We build an autonomous AI agent that ingests your calendar, your task manager, and your sent emails every Friday at 4 PM. It analyzes exactly what you *actually* did versus what you *said* you were going to do, and delivers a brutal, objective performance review.
          </p>
        </div>
      </div>

      <div className="border-t border-[#2a3a4a] pt-6">
        <h4 className="text-[#e8e0d0] font-semibold mb-4">What's Included in the Build:</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-[#8a9bb0]">
            <span className="text-[#c9a84c] mr-3">✓</span>
            <span><strong>Data Integration:</strong> Secure connection to your Google Calendar/Outlook, task manager (Todoist, ClickUp, Asana), and email outbox.</span>
          </li>
          <li className="flex items-start text-[#8a9bb0]">
            <span className="text-[#c9a84c] mr-3">✓</span>
            <span><strong>Custom Agent Logic:</strong> We program the AI with your specific quarterly goals and KPIs so it knows what actually matters.</span>
          </li>
          <li className="flex items-start text-[#8a9bb0]">
            <span className="text-[#c9a84c] mr-3">✓</span>
            <span><strong>Automated Delivery:</strong> The weekly brief is delivered automatically via Slack, Discord, or Email—no manual prompting required.</span>
          </li>
          <li className="flex items-start text-[#8a9bb0]">
            <span className="text-[#c9a84c] mr-3">✓</span>
            <span><strong>Privacy First:</strong> Built on secure infrastructure. The AI only reads metadata, not sensitive client information.</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-[#2a3a4a]">
        <button className="w-full md:w-auto bg-[#c9a84c] text-[#0d1117] font-bold py-3 px-8 rounded hover:bg-[#e0c060] transition-colors">
          Book Your AI COO Setup
        </button>
      </div>
    </div>
  );
};

export default AiCooService;
