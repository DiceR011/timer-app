import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer: React.FC = () => {
    const [workTime, setWorkTime] = useState<number>(25 * 60);
    const [breakTime, setBreakTime] = useState<number>(5 * 60);
    const [newWorkMinutes, setNewWorkMinutes] = useState<number>(25);
    const [newWorkSeconds, setNewWorkSeconds] = useState<number>(0);
    const [newBreakMinutes, setNewBreakMinutes] = useState<number>(5);
    const [newBreakSeconds, setNewBreakSeconds] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(workTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isWorkTime, setIsWorkTime] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isRunning && timeLeft > -1) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === -1) {
            clearInterval(timer);
            alert(isWorkTime ? "作業時間が終了しました！休憩時間を開始します。" : "休憩時間が終了しました！作業を再開します。");

            if (isWorkTime) {
                setTimeLeft(breakTime);
                setCount(count + 1);
            } else {
                setTimeLeft(workTime);
            }
            setIsWorkTime(!isWorkTime);
            setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft, isWorkTime, workTime, breakTime, count]);

    const toggleTimer = (): void => {
        setIsRunning(!isRunning);
    };

    const resetTimer = (): void => {
        setIsRunning(false);
        setTimeLeft(workTime);
        setIsWorkTime(true);
    };

    const applyChanges = (): void => {
        const newWorkTimeInSeconds = newWorkMinutes * 60 + newWorkSeconds;
        const newBreakTimeInSeconds = newBreakMinutes * 60 + newBreakSeconds;
        setWorkTime(newWorkTimeInSeconds);
        setBreakTime(newBreakTimeInSeconds);
        setTimeLeft(isWorkTime ? newWorkTimeInSeconds : newBreakTimeInSeconds);
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-60"> {/* タイマーの大きさを拡大 */}
                <CircularProgressbar
                    value={(timeLeft / (isWorkTime ? workTime : breakTime)) * 100}
                    text={formatTime(timeLeft)}
                    styles={buildStyles({
                        textColor: "#000",
                        pathColor: isWorkTime ? "#3e98c7" : "#ffa500",
                        trailColor: "#d6d6d6",
                        rotation: 0.5,
                    })}
                />
            </div>
            <div className="mt-4 text-lg font-semibold text-gray-700">
                現在 <span className="text-blue-500">{count}</span> ラップ
            </div>
            <div className="mt-6 flex space-x-4">
                <button
                    onClick={toggleTimer}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    {isRunning ? "一時停止" : "開始"}
                </button>
                <button
                    onClick={resetTimer}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                    リセット
                </button>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                {isRunning
                    ? isWorkTime
                        ? "作業中です。"
                        : "休憩中です。"
                    : isWorkTime
                        ? "作業を開始しましょう。"
                        : "休憩を再開しましょう。"}
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700">設定</h2>
                <div className="flex flex-col space-y-6 mt-4"> {/* 作業と休憩間に余白 */}
                    <div>
                        <label className="block text-gray-600 font-medium">作業時間 (分:秒)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                value={newWorkMinutes}
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value));
                                    setNewWorkMinutes(value);
                                }}
                                className="px-2 py-1 border border-gray-300 rounded"
                                disabled={isRunning}
                                min={0} // マイナス値を許可しない
                            />
                            <span>:</span>
                            <input
                                type="number"
                                value={newWorkSeconds}
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value));
                                    setNewWorkSeconds(value);
                                }}
                                className="px-2 py-1 border border-gray-300 rounded"
                                disabled={isRunning}
                                min={0} // マイナス値を許可しない
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">休憩時間 (分:秒)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                value={newBreakMinutes}
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value));
                                    setNewBreakMinutes(value);
                                }}
                                className="px-2 py-1 border border-gray-300 rounded"
                                disabled={isRunning}
                                min={0} // マイナス値を許可しない
                            />
                            <span>:</span>
                            <input
                                type="number"
                                value={newBreakSeconds}
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value));
                                    setNewBreakSeconds(value);
                                }}
                                className="px-2 py-1 border border-gray-300 rounded"
                                disabled={isRunning}
                                min={0} // マイナス値を許可しない
                            />
                        </div>
                    </div>

                </div>
                <div className="mt-4">
                    <button
                        onClick={applyChanges}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        disabled={isRunning}
                    >
                        変更を適用
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Timer;
