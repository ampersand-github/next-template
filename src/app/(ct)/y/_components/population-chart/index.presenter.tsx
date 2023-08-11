import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataItem } from "./index";

type Props = {
  data: DataItem[];
};

export const PopulationChartPresenter = ({ data }: Props) => {
  if (data.length === 0) {
    return (
      <p className={"flex justify-center opacity-60"}>
        一つ以上の都道府県にチェックを入れてください
      </p>
    );
  }

  return (
    <ResponsiveContainer aspect={16 / 9}>
      <LineChart
        style={{ marginLeft: "-16px" }} // 要素としてはずれてないが、見た目がずれているので調整
        data={data}
        margin={{ top: 12, right: 8, bottom: 24, left: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" label={{ value: "年", dy: 24 }} />
        <YAxis label={{ value: "万人", position: "insideLeft", angle: -90 }} />
        {Object.keys(data[0]).map((key, index) => {
          if (index === 0) return;
          return (
            <Line key={index} type="monotone" dataKey={key} stroke="#8884d8" />
          );
        })}
        <Legend verticalAlign={"top"} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
