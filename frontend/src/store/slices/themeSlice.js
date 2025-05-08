import { createSlice } from "@reduxjs/toolkit";

const slice=createSlice({
    name:"theme",
    initialState:{
        light:{
            name:"light",
            background:"#F9FAFB",
            cardBackground:"#FFFFFF",
            primary:"#3B82F6",
            accent:"#3B82F6",
            textPrimary:"#111827",
            textSecondary:"#6B7280",
            line:"#E5E7EB"
        },
        dark:{
            name:"dark",
            background:"#0F172A",
            cardBackground:"#1E293B",
            primary:"#3B82F6",
            accent:"#3B82F6",
            textPrimary:"#F8FAFC",
            textSecondary:"#94A3B8",
            line:"#334155"

        },
        currentTheme:{
            name:"dark",
            background:"#0F172A",
            cardBackground:"#1E293B",
            primary:"#3B82F6",
            accent:"#3B82F6",
            textPrimary:"#F8FAFC",
            textSecondary:"#94A3B8",
            line:"#334155",
            danger: "red",
        }
    },
    reducers:{
        
        toggleTheme:(state)=>{
            if(state.currentTheme.name==="light"){
                state.currentTheme=state.dark;
            }else{
                state.currentTheme=state.light;
            }
        }

    }
})

export const {toggleTheme}=slice.actions
export default slice.reducer;