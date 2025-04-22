import { PoneWineReport } from "../@types/ponewine-report";
import { ApiConfig } from "../configs/apiConfig";
import { apiService } from "../utils/apiService";

const fetchPoneWineReport = async () => {
    try {
        const { data } = await apiService.get(
          `${ApiConfig.baseUrl}/${ApiConfig.ponewine_report}`
        );
        return data.data as PoneWineReport[];
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export { fetchPoneWineReport }