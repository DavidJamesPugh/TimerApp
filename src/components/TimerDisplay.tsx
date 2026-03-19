import { StyleSheet, Text, View } from "react-native";

type TimerDisplayProps = {
  timeLabel: string;
  progress: number;
};

export function TimerDisplay({ timeLabel, progress }: TimerDisplayProps) {
  const safeProgress = Math.min(1, Math.max(0, progress));
  const percentage = Math.round(safeProgress * 100);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.timeText}>{timeLabel}</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.percentText}>{percentage}% complete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  timeText: {
    fontSize: 64,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 99,
    backgroundColor: "#2B3552",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#5EEAD4",
  },
  percentText: {
    color: "#BAC5E0",
    fontSize: 14,
  },
});
