import { motion } from "framer-motion";
import { useState } from "react";
import { FaBrain, FaTachometerAlt, FaCode, FaPlay, FaRedo, FaCheck } from "react-icons/fa";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'algorithm' | 'optimization' | 'logic';
  difficulty: 'easy' | 'medium' | 'hard';
  example: {
    input: string;
    output: string;
    explanation: string;
  };
}

export function ProblemSolvingSection() {
  const [activeChallenge, setActiveChallenge] = useState<string>('sorting');
  const [sortingArray, setSortingArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [sortingStep, setSortingStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentComparisons, setCurrentComparisons] = useState<number[]>([]);

  const challenges: Challenge[] = [
    {
      id: 'sorting',
      title: 'Bubble Sort Visualizer',
      description: 'Watch how bubble sort algorithm works step by step with visual comparisons.',
      category: 'algorithm',
      difficulty: 'easy',
      example: {
        input: '[64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]',
        explanation: 'Adjacent elements are compared and swapped if they are in wrong order.'
      }
    },
    {
      id: 'performance',
      title: 'Performance Optimizer',
      description: 'Compare O(n²) vs O(n log n) algorithms with different data sizes.',
      category: 'optimization',
      difficulty: 'medium',
      example: {
        input: 'Array size: 1000 items',
        output: 'O(n²): ~1M operations | O(n log n): ~10K operations',
        explanation: 'Demonstrates why algorithmic complexity matters for performance.'
      }
    },
    {
      id: 'fibonacci',
      title: 'Dynamic Programming',
      description: 'Fibonacci sequence with memoization to avoid redundant calculations.',
      category: 'logic',
      difficulty: 'medium',
      example: {
        input: 'fibonacci(10)',
        output: '55 (calculated efficiently)',
        explanation: 'Stores previous results to avoid recalculating the same values.'
      }
    }
  ];

  const bubbleSort = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const arr = [...sortingArray];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight comparison
        setCurrentComparisons([j, j + 1]);
        setSortingStep(i * n + j);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (arr[j] > arr[j + 1]) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSortingArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 400));
        }
      }
    }
    
    setCurrentComparisons([]);
    setIsAnimating(false);
  };

  const resetArray = () => {
    setSortingArray([64, 34, 25, 12, 22, 11, 90]);
    setCurrentComparisons([]);
    setSortingStep(0);
  };

  const [performanceData, setPerformanceData] = useState<{size: number, quadratic: number, linearithmic: number}[]>([
    { size: 100, quadratic: 10000, linearithmic: 664 },
    { size: 500, quadratic: 250000, linearithmic: 4482 },
    { size: 1000, quadratic: 1000000, linearithmic: 9966 },
    { size: 5000, quadratic: 25000000, linearithmic: 61438 },
  ]);

  const [fibonacciInput, setFibonacciInput] = useState<number>(10);
  const [fibonacciResult, setFibonacciResult] = useState<{value: number, operations: number} | null>(null);
  const [fibonacciCalculating, setFibonacciCalculating] = useState<boolean>(false);

  const calculateFibonacci = async () => {
    setFibonacciCalculating(true);
    
    // Simulate calculation with memoization
    const memo: { [key: number]: number } = {};
    let operations = 0;
    
    const fib = (n: number): number => {
      operations++;
      if (n <= 1) return n;
      if (memo[n]) return memo[n];
      
      memo[n] = fib(n - 1) + fib(n - 2);
      return memo[n];
    };
    
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = fib(fibonacciInput);
    
    setFibonacciResult({ value: result, operations });
    setFibonacciCalculating(false);
  };

  const getMaxValue = () => Math.max(...sortingArray);

  return (
    <section 
      id="problem-solving" 
      data-testid="problem-solving-section"
      className="py-20 px-4 sm:px-6 lg:px-8 section-bg-alternate"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 
            data-testid="problem-solving-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Problem-Solving Showcase
          </h2>
          <p className="text-muted-foreground text-lg">
            Interactive demonstrations of algorithmic thinking and optimization techniques
          </p>
        </motion.div>

        {/* Challenge Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {challenges.map((challenge) => (
            <motion.button
              key={challenge.id}
              onClick={() => setActiveChallenge(challenge.id)}
              data-testid={`challenge-${challenge.id}`}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeChallenge === challenge.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary/50 hover:bg-secondary text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {challenge.category === 'algorithm' && <FaBrain />}
              {challenge.category === 'optimization' && <FaTachometerAlt />}
              {challenge.category === 'logic' && <FaCode />}
              <span>{challenge.title}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                challenge.difficulty === 'easy' ? 'bg-green-500/20 text-green-600' :
                challenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-600' :
                'bg-red-500/20 text-red-600'
              }`}>
                {challenge.difficulty}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Challenge Content */}
        <motion.div
          key={activeChallenge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          {/* Bubble Sort Visualizer */}
          {activeChallenge === 'sorting' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Bubble Sort Algorithm</h3>
                <p className="text-muted-foreground mb-6">
                  Watch how the bubble sort algorithm compares adjacent elements and swaps them if they're in the wrong order.
                  The largest elements "bubble up" to the end of the array with each iteration.
                </p>
              </div>

              {/* Array Visualization */}
              <div className="bg-background rounded-lg p-6">
                <div className="flex items-end justify-center space-x-2 mb-6" style={{ height: '200px' }}>
                  {sortingArray.map((value, index) => (
                    <motion.div
                      key={`${index}-${value}`}
                      className={`w-12 rounded-t flex items-end justify-center text-white text-sm font-medium ${
                        currentComparisons.includes(index) 
                          ? 'bg-red-500' 
                          : 'bg-primary'
                      }`}
                      style={{ 
                        height: `${(value / getMaxValue()) * 150 + 30}px`,
                      }}
                      animate={{
                        backgroundColor: currentComparisons.includes(index) ? '#ef4444' : '#6366f1',
                        scale: currentComparisons.includes(index) ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="pb-2">{value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center space-x-4">
                  <motion.button
                    onClick={bubbleSort}
                    disabled={isAnimating}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
                    whileHover={{ scale: isAnimating ? 1 : 1.05 }}
                    whileTap={{ scale: isAnimating ? 1 : 0.95 }}
                    data-testid="start-sort"
                  >
                    <FaPlay />
                    <span>{isAnimating ? 'Sorting...' : 'Start Sort'}</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={resetArray}
                    disabled={isAnimating}
                    className="border border-border px-6 py-3 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
                    whileHover={{ scale: isAnimating ? 1 : 1.05 }}
                    whileTap={{ scale: isAnimating ? 1 : 0.95 }}
                    data-testid="reset-array"
                  >
                    <FaRedo />
                    <span>Reset</span>
                  </motion.button>
                </div>

                {isAnimating && (
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Comparing positions {currentComparisons.join(' and ')}...
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Performance Comparison */}
          {activeChallenge === 'performance' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Algorithm Performance Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  Compare the performance difference between O(n²) and O(n log n) algorithms.
                  Notice how the gap widens dramatically as data size increases.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Comparison Chart</h4>
                  <div className="bg-background rounded-lg p-4">
                    {performanceData.map((data, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Size: {data.size.toLocaleString()}</span>
                          <span className="text-muted-foreground">Operations</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="w-20 text-xs">O(n²):</span>
                            <div className="flex-1 bg-secondary rounded-full h-4 mx-2">
                              <motion.div
                                className="h-4 bg-red-500 rounded-full flex items-center justify-end pr-2"
                                style={{ width: `${Math.min((data.quadratic / 25000000) * 100, 100)}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((data.quadratic / 25000000) * 100, 100)}%` }}
                                transition={{ delay: index * 0.2 }}
                              >
                                <span className="text-xs text-white">{data.quadratic.toLocaleString()}</span>
                              </motion.div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="w-20 text-xs">O(n log n):</span>
                            <div className="flex-1 bg-secondary rounded-full h-4 mx-2">
                              <motion.div
                                className="h-4 bg-green-500 rounded-full flex items-center justify-end pr-2"
                                style={{ width: `${(data.linearithmic / 25000000) * 100}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.linearithmic / 25000000) * 100}%` }}
                                transition={{ delay: index * 0.2 + 0.1 }}
                              >
                                <span className="text-xs text-white">{data.linearithmic.toLocaleString()}</span>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Real-World Impact</h4>
                  <div className="space-y-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">O(n²) Algorithm</h5>
                      <p className="text-sm text-muted-foreground">
                        For 5,000 items: <strong>25 million operations</strong><br/>
                        Time: ~25 seconds on modern hardware
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">O(n log n) Algorithm</h5>
                      <p className="text-sm text-muted-foreground">
                        For 5,000 items: <strong>61,438 operations</strong><br/>
                        Time: ~0.06 seconds on modern hardware
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <h5 className="font-medium text-primary mb-2">Performance Gain</h5>
                      <p className="text-sm text-muted-foreground">
                        <strong>400x faster</strong> execution time!<br/>
                        This is why algorithm choice matters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fibonacci with Dynamic Programming */}
          {activeChallenge === 'fibonacci' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Dynamic Programming: Fibonacci</h3>
                <p className="text-muted-foreground mb-6">
                  See how memoization transforms an exponential O(2ⁿ) algorithm into an efficient O(n) solution
                  by storing previously calculated values.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold">Calculator</h4>
                  <div className="bg-background rounded-lg p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Enter Fibonacci position (1-40):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={fibonacciInput}
                        onChange={(e) => setFibonacciInput(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 bg-secondary border border-border rounded-lg"
                        data-testid="fibonacci-input"
                      />
                    </div>
                    
                    <motion.button
                      onClick={calculateFibonacci}
                      disabled={fibonacciCalculating}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
                      whileHover={{ scale: fibonacciCalculating ? 1 : 1.02 }}
                      whileTap={{ scale: fibonacciCalculating ? 1 : 0.98 }}
                      data-testid="calculate-fibonacci"
                    >
                      {fibonacciCalculating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Calculating...</span>
                        </>
                      ) : (
                        <>
                          <FaPlay />
                          <span>Calculate</span>
                        </>
                      )}
                    </motion.button>

                    {fibonacciResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <FaCheck className="text-green-500" />
                          <span className="font-medium">Result</span>
                        </div>
                        <p className="text-sm">
                          <strong>fibonacci({fibonacciInput}) = {fibonacciResult.value.toLocaleString()}</strong>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Calculated in only {fibonacciResult.operations} operations using memoization
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Algorithm Comparison</h4>
                  <div className="space-y-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">
                        Without Memoization - O(2ⁿ)
                      </h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Recalculates the same values repeatedly
                      </p>
                      <code className="text-xs bg-secondary px-2 py-1 rounded block">
                        fibonacci(40) = ~1.6 billion operations<br/>
                        Time: several seconds
                      </code>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">
                        With Memoization - O(n)
                      </h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Stores results to avoid redundant calculations
                      </p>
                      <code className="text-xs bg-secondary px-2 py-1 rounded block">
                        fibonacci(40) = ~40 operations<br/>
                        Time: instant
                      </code>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <h5 className="font-medium text-primary mb-2">Key Insight</h5>
                      <p className="text-sm text-muted-foreground">
                        Dynamic programming trades space for time, dramatically improving performance
                        by eliminating redundant work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}