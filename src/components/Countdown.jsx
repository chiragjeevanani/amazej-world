import React, { useCallback, useEffect, useRef, useState } from "react";

export function secBigIntToMs(tsSec) {
    const MAX_SAFE_SEC = BigInt(Math.floor(Number.MAX_SAFE_INTEGER / 1000));
    const clamped = tsSec > MAX_SAFE_SEC ? MAX_SAFE_SEC : tsSec;
    return Number(clamped * 1000n);
}

export function targetMsFromOnchain(tsSec) {
    if (!tsSec || tsSec === 0n) return null;
    const ms = secBigIntToMs(tsSec);
    return Math.max(ms, Date.now());
}

export function useCountdown({
    target,
    intervalMs = 1000,
    onEnd,
    startPaused = false,
}) {
    const targetMs = typeof target === "number" ? target : target.getTime();
    const [remainingMs, setRemainingMs] = useState(() => {
        if (typeof window === "undefined") return 0;
        return Math.max(0, targetMs - Date.now());
    });
    const [running, setRunning] = useState(() => !startPaused);
    const endedRef = useRef(false);
    const timerRef = useRef(null);

    const clear = () => {
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const tick = useCallback(() => {
        const now = Date.now();
        const ms = Math.max(0, targetMs - now);
        setRemainingMs(ms);
        if (ms === 0 && !endedRef.current) {
            endedRef.current = true;
            clear();
            onEnd?.();
        }
    }, [targetMs, onEnd]);

    const start = useCallback(() => {
        if (running) return;
        endedRef.current = false;
        setRunning(true);
    }, [running]);

    const pause = useCallback(() => {
        setRunning(false);
    }, []);

    const reset = useCallback(
        (newTarget) => {
            const t = typeof newTarget === "number" ? newTarget : newTarget.getTime();
            endedRef.current = false;
            setRunning(true);
            setRemainingMs(Math.max(0, t - Date.now()));
        },
        []
    );

    useEffect(() => {
        clear();
        tick();
        if (running) {
            timerRef.current = window.setInterval(tick, intervalMs);
        }
        return clear;
    }, [running, intervalMs, tick]);

    const total = Math.ceil(remainingMs / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    return {
        remainingMs, days, hours, minutes, seconds, running, start, pause, reset,
    };
}

export function ClaimCountdown({ nextClaimAtSec, onEnd }) {
    const targetMs = targetMsFromOnchain(nextClaimAtSec);

    if (targetMs === null) {
        return <span className="text-sm font-medium text-muted-foreground">Not scheduled</span>;
    }

    const { days, hours, minutes, seconds, running } = useCountdown({
        target: targetMs,
        onEnd,
    });

    const format = (n) => String(n).padStart(2, "0");

    return (
        <div className="flex items-center gap-1.5 font-bold">
            <span className="text-foreground">{format(days)}d</span>
            <span className="text-muted-foreground/30">:</span>
            <span className="text-foreground">{format(hours)}h</span>
            <span className="text-muted-foreground/30">:</span>
            <span className="text-foreground">{format(minutes)}m</span>
            <span className="text-muted-foreground/30">:</span>
            <span className="text-foreground">{format(seconds)}s</span>
            {!running && <span className="ml-2 text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Ready</span>}
        </div>
    );
}

export default function Countdown({ target, onEnd, className }) {
    const { days, hours, minutes, seconds, running, pause, start } = useCountdown({
        target,
        onEnd,
    });

    const format = (n) => String(n).padStart(2, "0");

    return (
        <div className={`flex flex-col items-center p-6 bg-card text-card-foreground transform active:scale-[0.98] transition-all ${className}`}>
            <div className="flex items-center gap-4 text-3xl font-black">
                <TimeBox label="Days" value={days} />
                <span className="text-muted-foreground/20">:</span>
                <TimeBox label="Hrs" value={hours} />
                <span className="text-muted-foreground/20">:</span>
                <TimeBox label="Min" value={minutes} />
                <span className="text-muted-foreground/20">:</span>
                <TimeBox label="Sec" value={seconds} />
            </div>
        </div>
    );
}

function TimeBox({ label, value }) {
    const pad = (n) => n.toString().padStart(2, "0");
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="text-foreground tabular-nums">{pad(value)}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
        </div>
    );
}
