import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export interface IState {
    data: [];
    loading: boolean;
    hasErrors: boolean;
    getData?:any;
    postData?:any; /// TODO разобраться с типами

}

const initialState: IState = {
    data: [],
    loading: false,
    hasErrors: false,
};

const useStore = create(
    devtools<IState>((set) => ({
        data: [],
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

useStore.getState().getData();


export default useStore;