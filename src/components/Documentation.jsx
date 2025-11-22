import React from 'react';
import { motion } from 'framer-motion';
import { X, Upload, MessageSquare, Link2, FileText, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';

const Documentation = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-background to-background/95 border border-primary/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50 bg-black/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gradient">Documentation</h2>
                            <p className="text-sm text-muted-foreground">How to use InstantRAG</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-muted-foreground hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
                    {/* Introduction */}
                    <section>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary" />
                            What is InstantRAG?
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            InstantRAG is a powerful RAG (Retrieval-Augmented Generation) service that allows you to upload PDF documents
                            and create an AI-powered chat interface to ask questions about your documents. Get instant, accurate answers
                            based on your document content.
                        </p>
                    </section>

                    {/* Step 1: Upload */}
                    <section className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                            <Upload className="w-5 h-5 text-primary" />
                            Upload Your PDF
                        </h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p><strong className="text-white">Location:</strong> Left section - "Upload PDF"</p>
                            <p><strong className="text-white">How to upload:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Click the upload area or drag & drop your PDF file</li>
                                <li>Wait for the upload progress bar to complete</li>
                                <li>Once uploaded, you'll see your file details and a generated chat link</li>
                            </ul>
                            <div className="mt-3 p-3 rounded-lg bg-success/10 border border-success/20">
                                <p className="text-success text-sm flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    The link is automatically generated and ready to use!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Step 2: Copy Link */}
                    <section className="p-4 rounded-xl bg-gradient-to-br from-accent/5 to-secondary/5 border border-accent/10">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">2</div>
                            <Link2 className="w-5 h-5 text-accent" />
                            Copy Your Chat Link
                        </h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p>After successful upload, you'll see:</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li><strong className="text-white">ID:</strong> A unique identifier for your document</li>
                                <li><strong className="text-white">Generated Link:</strong> Your personal chat URL</li>
                                <li>Click the "Copy Link" button to copy it to your clipboard</li>
                            </ul>
                            <p className="mt-2 text-sm">
                                💡 <strong className="text-white">Tip:</strong> Share this link with others to let them chat with your document too!
                            </p>
                        </div>
                    </section>

                    {/* Step 3: Test Chat */}
                    <section className="p-4 rounded-xl bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/10">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">3</div>
                            <MessageSquare className="w-5 h-5 text-secondary" />
                            Test Your Link
                        </h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p><strong className="text-white">Location:</strong> Right section - "Test Your Link"</p>
                            <p><strong className="text-white">How to test:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Paste your generated link in the input field</li>
                                <li>Click "Test Link" to activate the chat interface</li>
                                <li>Type your questions about the document</li>
                                <li>Press Enter or click Send to get AI-powered answers</li>
                            </ul>
                            <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                                <p className="text-primary text-sm">
                                    🤖 The AI will analyze your document and provide accurate, contextual answers!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section>
                        <h3 className="text-xl font-semibold text-white mb-3">✨ Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-white font-medium">📄 PDF Support</p>
                                <p className="text-sm text-muted-foreground">Upload any PDF document</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-white font-medium">⚡ Instant Processing</p>
                                <p className="text-sm text-muted-foreground">Fast document analysis</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-white font-medium">🔗 Shareable Links</p>
                                <p className="text-sm text-muted-foreground">Share with anyone</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-white font-medium">💬 AI Chat</p>
                                <p className="text-sm text-muted-foreground">Ask questions naturally</p>
                            </div>
                        </div>
                    </section>



                    {/* Integration Guide */}
                    <section className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                        <h3 className="text-lg font-semibold text-white mb-3">🚀 Use in Your Own Frontend (No Backend Needed!)</h3>
                        <p className="text-muted-foreground mb-4">
                            You can integrate the generated chat link into <strong className="text-white">any frontend application</strong> to create
                            a personal chatbot without building your own backend! Just make HTTP requests to the chat endpoint.
                        </p>

                        <div className="space-y-4">
                            {/* API Structure */}
                            <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                                <p className="text-white font-semibold mb-2">📡 API Request Format:</p>
                                <div className="space-y-2 text-sm font-mono">
                                    <p className="text-muted-foreground">
                                        <span className="text-accent">POST</span> https://backend-q71m.onrender.com/chat/<span className="text-primary">{'{id}'}</span>
                                    </p>
                                    <p className="text-muted-foreground mt-2">
                                        <span className="text-white">Headers:</span> Content-Type: application/json
                                    </p>
                                    <p className="text-muted-foreground">
                                        <span className="text-white">Body:</span> {`{ "question": "your question here" }`}
                                    </p>
                                </div>
                            </div>

                            {/* JavaScript Example */}
                            <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                                <p className="text-white font-semibold mb-2">💻 Example (Vanilla JavaScript):</p>
                                <pre className="text-xs text-muted-foreground overflow-x-auto">
                                    {`async function chatWithDocument(id, question) {
  const response = await fetch(
    \`https://backend-q71m.onrender.com/chat/\${id}\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    }
  );
  const data = await response.json();
  return data.answer; // Returns AI response
}`}
                                </pre>
                            </div>

                            {/* React Example */}
                            <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                                <p className="text-white font-semibold mb-2">⚛️ Example (React):</p>
                                <pre className="text-xs text-muted-foreground overflow-x-auto">
                                    {`const [answer, setAnswer] = useState('');

const askQuestion = async () => {
  const response = await fetch(
    'https://backend-q71m.onrender.com/chat/YOUR_ID',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'What is this about?' })
    }
  );
  const data = await response.json();
  setAnswer(data.answer);
};`}
                                </pre>
                            </div>

                            {/* Use Cases */}
                            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                <p className="text-primary font-semibold mb-2">✨ Use Cases:</p>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Add AI chat to your personal website</li>
                                    <li>Create a custom documentation assistant</li>
                                    <li>Build a mobile app with document Q&A</li>
                                    <li>Integrate into Chrome extensions</li>
                                    <li>No backend infrastructure needed!</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tips */}
                    <section className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20">
                        <h3 className="text-lg font-semibold text-white mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Ask specific questions for more accurate answers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent mt-1">•</span>
                                <span>The chat maintains context, so you can ask follow-up questions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary mt-1">•</span>
                                <span>Use "New Upload" to process a different document</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>The chat scrolls automatically to show the latest messages</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default Documentation;
