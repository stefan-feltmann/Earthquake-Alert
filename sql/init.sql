CREATE TABLE "EarthquakeInfo" (
  "magnitude" real,
  "place" varchar,
  "time" timestamp,
  "updated" timestamp,
  "timezone" integer,
  "url" varchar,
  "geojson_url" varchar,
  "felt" integer,
  "cdi" real,
  "mmi" real,
  "alert" varchar,
  "status" varchar,
  "tsunami" integer,
  "significance" integer,
  "network" varchar,
  "code" varchar,
  "ids" varchar,
  "sources" varchar,
  "product_types" varchar,
  "station_count" integer,
  "epicenter_distance" real,
  "root_mean_square" real,
  "gaps" real,
  "mag_type" varchar,
  "event_type" varchar,
  "geometry" POINT
);
