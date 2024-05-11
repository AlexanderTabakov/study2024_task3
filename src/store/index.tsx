import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";


export interface IData {
    id: number,
    title: string;
    items: IItem[]
}
export interface IItem {
    id: number;
    taskName:string;
    taskDescription?:string;
    tag?:string
}

export interface IState {
    data: IData[];
    loading: boolean;
    hasErrors: boolean;
    getData?: () => Promise<void>
    postData?: (task:IItem) => Promise<void>; /// TODO разобраться с типами!!!!
    addTask?: (newTask:IItem) => void
    removeTask?: (id: number) => void

}


const useStore = create(
    devtools<IState>((set, get) => ({
        data: [{ id: 1, title: "Not Started", items: [] },
        { id: 2, title: "Ready", items: [] },
        { id: 3, title: "In progress", items: [] },
        { id: 4, title: "Blocked", items: [] },
        { id: 5, title: "Done", items: [] },
        { id: 6, title: "Cancelled", items: [] },],
        loading: false,
        hasErrors: false,


        getData: async () => {
            set(() => ({ loading: true }));
            try {
                const response = await axios.get(
                    "https://66374e40288fedf6937ffce3.mockapi.io/boards/",
                );

                set((state: IState) => ({
                    data: (state.data = response.data),
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },


        addTask(newTask: IItem) {
            const columnIndex: any = get().data.findIndex((d) => d.title === 'Not Started');
            if (columnIndex !== -1) {
                const newTasks = [...get().data[columnIndex].items, newTask]
                const newColumns = [...get().data.slice(0, columnIndex),
                { ...get().data[columnIndex], items: newTasks },
                ...get().data.slice(columnIndex + 1),
                ];
                set({ data: newColumns })
            }
        },


        removeTask(id: number) {
            const newData = get().data.map(column => ({
                ...column,
                items: column.items.filter(item => item.id !== id)
            }));
            set({ data: newData });
        },




        postData: async (data) => {
            set(() => ({ loading: true }));
            try {
                await axios.put("https://66374e40288fedf6937ffce3.mockapi.io/boards"+ data.id, data);

                set((state: IState) => ({
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },

    })),
);

useStore.getState().getData();


export default useStore;