import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export interface IState {
    data: [];
    posts: [];
    restaraunts: [];
    loading: boolean;
    hasErrors: boolean;
    getData?: any;
    getPosts?: any;
    getRestaraunts?: any;
}

const initialState: IState = {
    data: [],
    posts: [],
    restaraunts: [],
    loading: false,
    hasErrors: false,
};

const useStore = create(
    devtools<IState>((set) => ({
        data: [],
        posts: [],
        restaraunts: [],
        loading: false,
        hasErrors: false,

        getData: async () => {
            set(() => ({ loading: true }));
            try {
                const response = await axios.get(
                    "https://65faa5a63909a9a65b1b056e.mockapi.io/dishes",
                );

                set((state: IState) => ({
                    data: (state.data = response.data),
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },

        getPosts: async () => {
            set(() => ({ loading: true }));
            try {
                const response = await axios.get(
                    "https://6625022f04457d4aaf9d8f31.mockapi.io/posts",
                );

                set((state: IState) => ({
                    data: (state.posts = response.data),
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },

        getRestaraunts: async () => {
            set(() => ({ loading: true }));
            try {
                const response = await axios.get(
                    "https://662a24ed67df268010a2c461.mockapi.io/restaraunts",
                );

                set((state: IState) => ({
                    data: (state.restaraunts = response.data),
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },
    })),
);

useStore.getState().getData();
useStore.getState().getPosts();
useStore.getState().getRestaraunts();

export default useStore;