import { Game } from "../@types/game";
import { GameProduct } from "../@types/game-product";
import { PlayHistory } from "../@types/play-history";
import { ApiConfig } from "../configs/apiConfig";
import { apiService } from "../utils/apiService";
import get from "lodash/get";

const fetchAllGamesByProviderAndType = async ({
  game_type_id,
  provider_id,
}: {
  provider_id: number;
  game_type_id: number;
}) => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.gameList}/${game_type_id}/${provider_id}`
    );

    return data.data as Game[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchGameProductsByGameType = async (game_type_id: number) => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.gameProduct}/${game_type_id}`
    );

    return data.data as GameProduct;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchGamePlayHistory = async (
  type: "this_week" | "today" | "yesterday" | "last_week"
) => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.gameLogs}?type=${type}`
    );

    return data.data as PlayHistory[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchHotGames = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.hotGames}`
    );

    return data.data as Game[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchGameUrl = async (game: {
  provider_code: string,
  code: string,
  type_id: number
}) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.launchGame}`,
      {
        provider_id: game.provider_code,
        game_id: game.code,
        type_id: game.type_id,
      }
    );
    return {
      Url: get(data, "Url", "") as string,
    };
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
};

export {
  fetchAllGamesByProviderAndType,
  fetchGameProductsByGameType,
  fetchGamePlayHistory,
  fetchHotGames,
  fetchGameUrl,
};
