import mqtt from "mqtt";
import { parse } from "../common/utils.js";

const config = {
  MQTT_URL: "mqtt://test.mosquitto.org:8080",
};

const client = mqtt.connect(config.MQTT_URL);

client.on("connect", () => {
  console.log("Connected");
  client.subscribe("current/leds", (err) => {
    if (err) {
      console.err("Failed to subscribe");
    } else {
      console.log("Subscribed");
    }
  });
});

export default class {
  static setOnMessage = (callback) => client.on("message", callback);

  static publishLuce = (luce) => {
    client.publish("new/luce", parse(luce));
    console.log(parse(luce));
  };

  static publishMode = (clap, sound) => {
    client.publish("new/mode", `${parse(clap)} ${parse(sound)}`);
    console.log(clap, sound);
  };

  static publishChangeMode = () => {
    client.publish("new/change", "");
    console.log("change");
  };
}
