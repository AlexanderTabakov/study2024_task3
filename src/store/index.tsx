import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";


export interface IData  {
    id:number,
    title:string;
    items:IItem[]
}
export interface IItem {
    id:number;
    title:string;
}

export interface IState {
    data: IData[];
    loading: boolean;
    hasErrors: boolean;
    getData?:any;
    postData?:any; /// TODO разобраться с типами!!!!
    addTask?:any
    removeTask?:any

}



const useStore = create(
    devtools<IState>((set, get) => ({
        data:[{ id: 1, title: "Not Started", items: [] },
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
                    "https://66374e40288fedf6937ffce3.mockapi.io/boards",
                );

                set((state: IState) => ({
                    data: (state.data = response.data),
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },

        addTask (newTask:IState) {
            const  task :any = [...get().data, newTask ]
            set({data:task})
        },

        removeTask (id:any) {
            const  removeTask:any = [...get().data.filter((t:any)=>t.id!==id) ]
            set({data:removeTask})
        },





        postData: async (task:{}) => {
            set(() => ({ loading: true }));
            try {
                //  await axios({
                //     url:"https://66374e40288fedf6937ffce3.mockapi.io/boards",
                //     data:task
                // });
                await axios.post("https://66374e40288fedf6937ffce3.mockapi.io/boards",{
                    data:task
                });

                set((state: IState) => ({
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },

    })),
);

// useStore.getState().getData();


export default useStore;