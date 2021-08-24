import { SelectedBlockProvider } from "home/__states";
import { SelectedDayProvider } from "home/__states";
import { useContext } from "react";
import ExerciseSet from "./exercise-set/exercise-set";
import { useSelectedExerciseDay } from "../__states";

export default function SelectedExerciseDay(): JSX.Element {
    const [selectedBlock] = useContext(SelectedBlockProvider);
    const [selectedDay] = useContext(SelectedDayProvider);
    const { day, block } = useSelectedExerciseDay({ selectedDay, selectedBlock })!;

    if (day && block) {
        return <ExerciseSet day={day} block={block}/>;
    }
    return <span className="ExerciseSet">loading...</span>;
}