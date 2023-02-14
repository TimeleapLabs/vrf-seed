import { prove, proofToHash } from "@kenshi.io/node-ecvrf";
import { createHash } from "crypto";
import { ethers } from "ethers";

const privateKey = Buffer.from("Kenshi VRF-SEED V1").toString("hex");

const hash = (...args) => {
  const sha256 = createHash("sha256");
  for (const arg of args) {
    sha256.update(arg);
  }
  return sha256.digest().toString("hex");
};

const generate = (seed, index) => {
  const alpha = hash(`${seed}.${index}`);
  const proof = prove(privateKey, alpha);
  const key = proofToHash(proof);
  return key.toString("hex");
};

export const getMnemonic = (seed, index) => {
  const key = generate(seed, index);
  return ethers.utils.entropyToMnemonic(`0x${key}`);
};

export const getWallet = (seed, index) => {
  const key = generate(seed, index);
  return new ethers.Wallet(key);
};
