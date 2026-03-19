import { Pressable, StyleSheet, Text, View } from "react-native";

type TimerControlsProps = {
  isRunning: boolean;
  canStart: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export function TimerControls({
  isRunning,
  canStart,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <View style={styles.row}>
      <Pressable
        style={[styles.primaryButton, !canStart && styles.disabledButton]}
        onPress={isRunning ? onPause : onStart}
        disabled={!canStart}
      >
        <Text style={styles.primaryLabel}>{isRunning ? "Pause" : "Start"}</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={onReset}>
        <Text style={styles.secondaryLabel}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 2,
    borderRadius: 16,
    backgroundColor: "#5EEAD4",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#071129",
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#253154",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DBE3F4",
  },
});
