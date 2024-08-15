import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import './Dashboard.css';
import mS1 from './images/im1.png';
import mS2 from './images/kw 1.png';
import mS3 from './images/voltmeter 1.png';
import power from './images/power 1.png';
import freq from './images/freq.png';

const Dashboard = () => {
  const [totalPower, setTotalPower] = useState(0.0);
  const [kw, setKw] = useState(0.0);
  const [kva, setKva] = useState(0.0);
  const [powerFactor, setPowerFactor] = useState(0.0);
  const [frequency, setFrequency] = useState(0.0);

  useEffect(() => {
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('totalPower');
      client.subscribe('kw');
      client.subscribe('kva');
      client.subscribe('powerFactor');
      client.subscribe('frequency');
    });

    client.on('message', (topic, message) => {
      const value = parseFloat(message.toString());
      switch (topic) {
        case 'totalPower':
          setTotalPower(value);
          break;
        case 'kw':
          setKw(value);
          break;
        case 'kva':
          setKva(value);
          break;
        case 'powerFactor':
          setPowerFactor(value);
          break;
        case 'frequency':
          setFrequency(value);
          break;
        default:
          break;
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div style={{ background: "#FFFFFF" }}>
      <div className="container">
        <div className="cards">
          <div className="card">
            <div className="icon">
              <img src={mS1} alt="" srcSet="" />
            </div>
            <h1>Total Power</h1>
            <p><b>{totalPower.toFixed(1)}</b></p>
          </div>
          <div className="card">
            <div className="icon">
              <img src={mS2} alt="" srcSet="" />
            </div>
            <h1>KW</h1>
            <p><b>{kw.toFixed(1)}</b></p>
          </div>
          <div className="card">
            <div className="icon">
              <img src={mS3} alt="" srcSet="" />
            </div>
            <h1>KVA</h1>
            <p><b>{kva.toFixed(1)}</b></p>
          </div>
        </div>
      </div>

      <div className="long-card">
        <h2><b>Energy Analyzer Details</b></h2>
        <br />
        <div className="inner-cards">
          <div className="cardss">
            <div className="card-content">
              <img src={power} alt="Power Icon" className="card-icon" />
              <p><b>Power Factor</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{powerFactor.toFixed(1)}</b></p>
            </div>
          </div>
          <div className="cardss">
            <div className="card-content">
              <img src={freq} alt="Frequency Icon" className="card-icon" />
              <p><b>Frequency</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{frequency.toFixed(1)} HZ</b></p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="long-card">
        <h1><b>AC Data Information</b></h1>
        <div className="relative overflow-x-auto tables">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <b>LINE CURRENT</b>
                </th>
                <th scope="col" className="px-6 py-3">
                  <b>LINE VOLTAGES</b>
                </th>
                <th scope="col" className="px-6 py-3">
                  <b>LINE POWER</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  <b>L1 (AMP) 0.0</b>
                </th>
                <td className="px-6 py-4">
                  <b>L1/L2/N 0.0 v</b>
                </td>
                <td className="px-6 py-4">
                  <b>L1 0.0 KW</b>
                </td>
              </tr>
              <tr className="bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  <b>L2 (AMP) 0.0</b>
                </th>
                <td className="px-6 py-4">
                  <b>L2/L3/N 0.0 v</b>
                </td>
                <td className="px-6 py-4">
                  <b>L1 0.0 KW</b>
                </td>
              </tr>
              <tr className="bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  <b>L3 (AMP) 0.0</b>
                </th>
                <td className="px-6 py-4">
                  <b>L1/L3/N 0.0 v</b>
                </td>
                <td className="px-6 py-4">
                  <b>L1 0.0 KW</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
