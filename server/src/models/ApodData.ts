import { Model, Column, Table } from "sequelize-typescript";

@Table
export class ApodData extends Model<ApodData> {
  @Column
  copyright:       string;
  @Column
  date:            string;
  @Column
  explanation:     string;
  @Column
  hdurl:           string;
  @Column
  media_type:      string;
  @Column
  service_version: string;
  @Column
  title:           string;
  @Column
  url:             string;
}
