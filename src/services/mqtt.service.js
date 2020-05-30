import mqtt from "mqtt";
import { parse } from "../common/utils.js";

const config = {
  MQTT_URL: "mqtt://test.mosquitto.org:8080",
};

const client = mqtt.connect(config.MQTT_URL);

client.on("connect", () => {
  console.log("Connected");
  client.subscribe(["current/+", "dnd/+"], (err) => {
    if (err) {
      console.err("Failed to subscribe");
    } else {
      console.log("Succesfully subscribed");
    }
  });
});

class Api {
  static setOnMessage = (callback) => client.on("message", callback);

  static publishLuce = (luce) => {
    client.publish("new/luce", parse(luce), { qos: 1 });
    console.log("Published switch light to:", luce);
  };

  static publishMode = (clap, sound) => {
    client.publish("new/mode", `${parse(clap)} ${parse(sound)}`, { qos: 1 });
    console.log("Published switch mode to", clap, sound);
  };

  static publishChangeMode = () => {
    client.publish("new/change", "", { qos: 1 });
    console.log("Published change mode");
  };

  static publishedDNDEnabled = false;

  static publishDNDEnabled = (enabled) => {
    Api.publishedDNDEnabled = true;
    client.publish("dnd/enabled", enabled.toString(), { qos: 1, retain: true });
    console.log("Published DND enabled:", enabled);
  };

  static publishedDNDTimes = false;

  static publishDNDTimes = (oraInizio, oraFine) => {
    Api.publishedDNDTimes = true;
    const message = `${oraInizio} ${oraFine}`
    client.publish("dnd/times", message, { qos: 1, retain: true });
    console.log("Published DND Interval:", message);
  };
}

export { Api as default };
