import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import Toast from "react-native-toast-message";
const initialState = {
  teamDetails: {
    teamData: "",
    membersData: "",
  },
};

export const updateMemberStatus = createAsyncThunk(
  "teams/updateMemberStatus",

  async (data) => {
    try {
      const response = await FourBrainsAPI.post(
        "4brains/team/player/membership/update/",
        {
          team_id: data.team_id,
          player_id: data.player_id,
          new_status: data.status,
        },
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        console.log(data);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
);

export const inviteToTeam = createAsyncThunk(
  "teams/inviteToTeam",
  async (data) => {
    try {
      let response = await FourBrainsAPI.post(
        "4brains/team/player/membership/update/",
        {
          team_id: data.team_id,
          player_id: data.player_id,
          new_status: "inv",
        },
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      );
      if (response.data.success) {
        getTeamDetails({
          token: data.token,
          team_id: data.team_id,
        });
        Toast.show({
          type: "success",
          text1: "Invite success",
        });
        return null;
      } else {
         Toast.show({
           type: "error",
           text1: "Invite failed",
         });
        return null;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Invite failed",
      });
      return null;
    }
  }
);

export const getTeamDetails = createAsyncThunk(
  "teams/getTeamDetails",
  async (data) => {
    try {
      const response = await FourBrainsAPI.get(
        `4brains/team/${data.team_id}/info/`,
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        return {
          teamData: response.data.team_data,
          membersData: response.data.members_data,
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
);

const TeamDetailsSlice = createSlice({
  name: "teamDetails",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getTeamDetails.fulfilled, (state, action) => {
        state.teamDetails = action.payload;
      })
      .addCase(getTeamDetails.rejected, (state, action) => {
        state.teamDetails = {
          teamData: "",
          membersData: "",
        };
      })
      .addCase(inviteToTeam.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateMemberStatus.fulfilled, (state, action) => {
        const memberIndex = state.teamDetails.membersData.findIndex(
          (obj) => obj.player_id == action.payload.player_id
        );
        state.teamDetails.membersData[memberIndex].status =
          action.payload.status;
        if (action.payload.updateCurUser === true)
          state.teamDetails.teamData.membership = action.payload.status;
      });
  },
});

export const selectTeamDetails = (state) => state.teamDetails.teamDetails;

export default TeamDetailsSlice.reducer;
