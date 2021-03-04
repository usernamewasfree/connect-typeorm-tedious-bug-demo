import { ISession } from "connect-typeorm";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";
@Entity()
export class Session implements ISession {
  @Index()
  @Column("bigint", {
    transformer: {
      from: (db: string) => Number(db),
      to: (js: number) => String(js)
    }
  })
  public expiredAt = Date.now();

  @PrimaryColumn("varchar", { length: 255 })
  public id = "";

  @Column("text")
  public json = "";
}