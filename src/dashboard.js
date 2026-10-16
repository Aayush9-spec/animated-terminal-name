import os from "node:os";
import process from "node:process";
import chalk from "chalk";

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

export function getSystemSnapshot() {
  const total = os.totalmem();
  const free = os.freemem();
  const cpus = os.cpus();
  const load = os.loadavg();
  return {
    platform: `${os.type()} ${os.release()}`,
    architecture: os.arch(),
    hostname: os.hostname(),
    cpuModel: cpus[0]?.model ?? "Unknown CPU",
    cpuCores: cpus.length,
    loadAverage: load,
    totalMemory: total,
    freeMemory: free,
    usedMemory: total - free,
    memoryPercent: total ? ((total - free) / total) * 100 : 0,
    uptime: os.uptime(),
    processMemory: process.memoryUsage().rss
  };
}

export function renderDashboard() {
  const s = getSystemSnapshot();
  const now = new Date().toLocaleString();
  const width = 58;
  const line = "─".repeat(width);
  const used = Math.round(s.memoryPercent / 5);
  const bar = `${"█".repeat(used)}${"░".repeat(Math.max(0, 20 - used))}`;
  console.log(chalk.cyan(`┌${line}┐`));
  console.log(chalk.cyan("│") + chalk.bold("                 AAYUSH • SYSTEM DASHBOARD                 ") + chalk.cyan("│"));
  console.log(chalk.cyan(`├${line}┤`));
  console.log(`${chalk.cyan("│")} ${chalk.gray("Time")}             ${now}`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("Platform")}         ${s.platform} (${s.architecture})`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("Hostname")}         ${s.hostname}`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("CPU")}              ${s.cpuModel}`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("CPU cores")}        ${s.cpuCores}`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("Load average")}     ${s.loadAverage.map(n => n.toFixed(2)).join(" / ")}`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("System memory")}    ${formatBytes(s.usedMemory)} / ${formatBytes(s.totalMemory)}`);
  console.log(`${chalk.cyan("│")} ${chalk.green(bar)} ${s.memoryPercent.toFixed(1)}%`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("Node process RAM")} ${formatBytes(s.processMemory)}`);
  console.log(`${chalk.cyan("│")} ${chalk.gray("System uptime")}    ${formatUptime(s.uptime)}`);
  console.log(chalk.cyan(`└${line}┘`));
  console.log(chalk.gray("  Note: CPU load averages may be unavailable or behave differently on some platforms."));
}
