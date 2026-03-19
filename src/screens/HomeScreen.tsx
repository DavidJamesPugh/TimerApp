import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TimerControls } from "@/src/components/TimerControls";
import { TimerDisplay } from "@/src/components/TimerDisplay";
import { useTimer } from "@/src/hooks/useTimer";
import { formatTime } from "@/src/utils/formatTime";

const PRESET_MINUTES = [1, 5, 25];

export default function HomeScreen() {
  const {
    remainingSeconds,
    isRunning,
    progress,
    setDuration,
    start,
    pause,
    reset,
  } = useTimer({ initialSeconds: 25 * 60 });

  const canStart = remainingSeconds > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Timer</Text>
        <Text style={styles.subHeading}>Focus and keep momentum.</Text>

        <TimerDisplay timeLabel={formatTime(remainingSeconds)} progress={progress} />

        <View style={styles.presetRow}>
          {PRESET_MINUTES.map((minuteValue) => (
            <Pressable
              key={minuteValue}
              style={styles.presetButton}
              onPress={() => setDuration(minuteValue * 60)}
            >
              <Text style={styles.presetLabel}>{minuteValue}m</Text>
            </Pressable>
          ))}
        </View>

        <TimerControls
          isRunning={isRunning}
          canStart={canStart}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    justifyContent: "center",
    gap: 24,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  subHeading: {
    color: "#BAC5E0",
    fontSize: 16,
    textAlign: "center",
  },
  presetRow: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  presetButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#1D2743",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  presetLabel: {
    color: "#DBE3F4",
    fontSize: 15,
    fontWeight: "600",
  },
});