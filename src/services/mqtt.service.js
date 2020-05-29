import mqtt from "mqtt";
import { parse } from "../common/utils.js";

const config = {
  MQTT_URL: "mqtt://test.mosquitto.org:8080",
};

const client = mqtt.connect(config.MQTT_URL);

client.on("connect", () => {
  console.log("Connected");
  client.subscribe("current/+", (err) => {
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
    client.publish("new/luce", parse(luce), {qos: 1});
    console.log('luce');
  };

  static publishMode = (clap, sound) => {
    client.publish("new/mode", `${parse(clap)} ${parse(sound)}`, {qos: 1});
    console.log('mode');
  };

  static publishChangeMode = () => {
    client.publish("new/change", "", {qos: 1});
    console.log("change");
  };
}
