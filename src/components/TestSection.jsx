import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare, Send, Loader2, TestTube } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';

const TestSection = () => {
    const [link, setLink] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLinkValid, setIsLinkValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleTestLink = (e) => {
        e.preventDefault();
        if (!link.trim()) return;

        // Validate link format
        if (!link.includes('/chat/')) {
            alert('Please enter a valid chat link');
            return;
        }

        setIsLoading(true);

        // Just validate the link format, no API call needed
        setTimeout(() => {
            setIsLoading(false);
            setIsLinkValid(true);
            setMessages([
                {
                    id: 1,
                    type: 'bot',
                    text: "Hello! I'm ready to answer questions about your document. What would you like to know?"
                }
            ]);
        }, 800);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isSending) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputMessage
        };

        setMessages(prev => [...prev, userMessage]);
        const question = inputMessage;
        setInputMessage('');
        setIsSending(true);

        try {
            // Extract namespace from link
            const namespace = link.split('/chat/')[1];

            if (!namespace) {
                throw new Error('Invalid link format');
            }

            // Make actual API call to backend
            const response = await fetch(`https://backend-q71m.onrender.com/chat/${namespace}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: question })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: data.formatted_answer || data.answer || 'I received your question but couldn\'t generate a response.'
            };

            setMessages(prev => [...prev, botMessage]);
            setIsSending(false);

        } catch (error) {
            console.error('Chat error:', error);

            const errorMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: '❌ Failed to get response. Please make sure the link is valid and try again.'
            };

            setMessages(prev => [...prev, errorMessage]);
            setIsSending(false);
        }
    };

    const resetTest = () => {
        setIsLinkValid(false);
        setMessages([]);
        setLink('');
        setInputMessage('');
    };

    return (
        <div className="h-full flex flex-col justify-center max-w-xl mx-auto w-full p-8 animate-slide-left">
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col"
            >
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <TestTube className="w-6 h-6 text-accent" />
                        <h2 className="text-4xl font-heading font-bold text-gradient-animate">
                            Test Your Link
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Preview how your users will interact with the intelligent chat.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {!isLinkValid ? (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Card className="p-8 border-border bg-gradient-to-br from-accent/5 to-secondary/5 backdrop-blur-xl relative overflow-hidden">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10 opacity-50" />

                                <form onSubmit={handleTestLink} className="space-y-6 relative z-10">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-accent" />
                                            Chat Link
                                        </label>
                                        <Input
                                            placeholder="https://instantrag.app/chat/..."
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            className="bg-black/40 border-accent/20 focus:border-accent/50 h-14 text-base transition-all"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-14 bg-gradient-to-r from-accent to-secondary text-white hover:opacity-90 font-semibold text-base glow-accent transition-all"
                                        disabled={isLoading || !link.trim()}
                                    >
                                        {isLoading ? (
                                            <motion.div
                                                className="flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Connecting...
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                className="flex items-center gap-2"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <Sparkles className="w-5 h-5" />
                                                Test Link
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                            className="flex-1 flex flex-col"
                        >
                            <Card className="flex-1 flex flex-col border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5 backdrop-blur-xl overflow-hidden glow-accent">
                                {/* Chat Header */}
                                <div className="p-6 border-b border-accent/20 bg-black/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center border border-accent/30">
                                                <Sparkles className="w-5 h-5 text-accent" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">AI Assistant</h3>
                                                <p className="text-xs text-muted-foreground">Ready to help</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={resetTest}
                                            className="text-muted-foreground hover:text-white hover:bg-white/5"
                                        >
                                            New Test
                                        </Button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="max-h-96 p-6 overflow-y-auto space-y-4">
                                    <AnimatePresence>
                                        {messages.map((message, index) => (
                                            <motion.div
                                                key={message.id}
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                {message.type === 'bot' && (
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center shrink-0 border border-accent/30">
                                                        <Sparkles className="w-4 h-4 text-accent" />
                                                    </div>
                                                )}
                                                <div
                                                    className={`max-w-[75%] rounded-2xl p-4 ${message.type === 'user'
                                                        ? 'bg-gradient-to-br from-primary to-accent text-white rounded-tr-sm'
                                                        : 'bg-white/5 text-foreground rounded-tl-sm border border-white/10'
                                                        }`}
                                                >
                                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Typing Indicator */}
                                    {isSending && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center shrink-0 border border-accent/30">
                                                <Sparkles className="w-4 h-4 text-accent" />
                                            </div>
                                            <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 border border-white/10">
                                                <div className="flex gap-1">
                                                    <motion.div
                                                        className="w-2 h-2 bg-accent rounded-full"
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-accent rounded-full"
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-accent rounded-full"
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Scroll anchor */}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-6 border-t border-accent/20 bg-black/20">
                                    <form onSubmit={handleSendMessage} className="flex gap-3">
                                        <Input
                                            placeholder="Ask a question..."
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            className="flex-1 bg-black/40 border-accent/20 focus:border-accent/50 h-12"
                                            disabled={isSending}
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            className="h-12 w-12 bg-gradient-to-r from-accent to-secondary hover:opacity-90 shrink-0"
                                            disabled={isSending || !inputMessage.trim()}
                                        >
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </form>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default TestSection;
