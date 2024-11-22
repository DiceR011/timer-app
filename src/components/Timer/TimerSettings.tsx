interface TimerSettingsProps {
    newWorkMinutes: number;
    newWorkSeconds: number;
    setNewWorkMinutes: (value: number) => void;
    setNewWorkSeconds: (value: number) => void;
    newBreakMinutes: number;
    newBreakSeconds: number;
    setNewBreakMinutes: (value: number) => void;
    setNewBreakSeconds: (value: number) => void;
    applyChanges: () => void;
    isRunning: boolean;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
    newWorkMinutes,
    newWorkSeconds,
    setNewWorkMinutes,
    setNewWorkSeconds,
    newBreakMinutes,
    newBreakSeconds,
    setNewBreakMinutes,
    setNewBreakSeconds,
    applyChanges,
    isRunning,
}) => {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">設定</h2>
            <div className="flex flex-col space-y-6 mt-4">
                <div>
                    <label className="block text-gray-600 font-medium">作業時間 (分:秒)</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            value={newWorkMinutes}
                            onChange={(e) => setNewWorkMinutes(Math.max(0, Number(e.target.value)))}
                            className="px-2 py-1 border border-gray-300 rounded"
                            disabled={isRunning}
                        />
                        <span>:</span>
                        <input
                            type="number"
                            value={newWorkSeconds}
                            onChange={(e) => setNewWorkSeconds(Math.max(0, Number(e.target.value)))}
                            className="px-2 py-1 border border-gray-300 rounded"
                            disabled={isRunning}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-600 font-medium">休憩時間 (分:秒)</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            value={newBreakMinutes}
                            onChange={(e) => setNewBreakMinutes(Math.max(0, Number(e.target.value)))}
                            className="px-2 py-1 border border-gray-300 rounded"
                            disabled={isRunning}
                        />
                        <span>:</span>
                        <input
                            type="number"
                            value={newBreakSeconds}
                            onChange={(e) => setNewBreakSeconds(Math.max(0, Number(e.target.value)))}
                            className="px-2 py-1 border border-gray-300 rounded"
                            disabled={isRunning}
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
    );
};

export default TimerSettings;
