import { create } from "zustand";

interface IPDFStore {
    data: {
        from: string,
        to: string,
        totalTime: string,
        totalDistance: string
    }
    instructions: string[];
    setInformation: (data: {
        from: string,
        to: string,
        totalTime: string,
        totalDistance: string
    }) => void;
    addInstruction: (instruction: string) => void;
    addInstructions: (instructions: string[]) => void;
}

export const usePDFStore = create<IPDFStore>((set, get) => ({
    data: {
        from: "",
        to: "",
        totalTime: "",
        totalDistance: ""
    },
    instructions: [],

    setInformation(data: {
        from: string,
        to: string,
        totalTime: string,
        totalDistance: string
    }) {
        set({
            data: {
                ...data
            }
        })
    }
    ,
    addInstruction (instruction: string) {
        set((state) => ({
            instructions: [
                ...state.instructions,
                instruction
            ]
        }))
    },

    addInstructions (instructions: string[]) {
        set((state) => ({
            instructions: [
                ...state.instructions,
                ...instructions
            ]
        }))
    }
  }))