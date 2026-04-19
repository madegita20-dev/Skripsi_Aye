import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./components/Sidebar";
import { DataTable } from "./components/DataTable";
import { UploadButton } from "./components/UploadButton";
import { BarChart3, TrendingUp, Users, FileCheck } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [pengajarData, setPengajarData] = useState([
    { no: 1, nama: "Dr. Ahmad Maulana, S.Kom., M.T." },
    { no: 2, nama: "Prof. Siti Nurhaliza, S.Si., M.Kom." },
    { no: 3, nama: "Ir. Budi Santoso, M.Eng." },
    { no: 4, nama: "Dra. Indah Permata, M.Pd." },
    { no: 5, nama: "Dr. Eko Prasetyo, S.T., M.Sc." },
  ]);

  const [rekapanData, setRekapanData] = useState([
    { no: 1, pengajar: "Dr. Ahmad Maulana", kategori: "Excellent", skor: "95.5" },
    { no: 2, pengajar: "Prof. Siti Nurhaliza", kategori: "Very Good", skor: "88.2" },
    { no: 3, pengajar: "Ir. Budi Santoso", kategori: "Good", skor: "78.9" },
    { no: 4, pengajar: "Dra. Indah Permata", kategori: "Very Good", skor: "85.3" },
  ]);

  const [preprocessingData, setPreprocessingData] = useState([
    { no: 1, file: "dataset_semester1.csv", status: "Processed", tanggal: "2026-04-15" },
    { no: 2, file: "dataset_semester2.csv", status: "Pending", tanggal: "2026-04-16" },
    { no: 3, file: "dataset_semester3.csv", status: "Processed", tanggal: "2026-04-14" },
  ]);

  const handleUpload = (file: File) => {
    console.log("File uploaded:", file.name);
    alert(`File "${file.name}" uploaded successfully!`);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    delay,
    onClick,
  }: {
    title: string;
    value: string;
    icon: any;
    color: string;
    delay: number;
    onClick?: () => void;
  }) => (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-card rounded-xl p-6 border-l-4 ${color} shadow-lg hover:shadow-xl transition-all group cursor-pointer w-full text-left`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color.replace("border", "bg")}/10 group-hover:scale-110 transition-transform`}>
          <Icon className={`w-6 h-6 ${color.replace("border", "text")}`} />
        </div>
      </div>
    </motion.button>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeSection === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black text-foreground mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Dashboard
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg"
                  >
                    Welcome to the Classification System Overview
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <StatCard
                    title="Total Pengajar"
                    value={pengajarData.length.toString()}
                    icon={Users}
                    color="border-primary"
                    delay={0.1}
                    onClick={() => setActiveSection("pengajar")}
                  />
                  <StatCard
                    title="Hasil Klasifikasi"
                    value={rekapanData.length.toString()}
                    icon={BarChart3}
                    color="border-secondary"
                    delay={0.2}
                    onClick={() => setActiveSection("rekapan")}
                  />
                  <StatCard
                    title="Data Processed"
                    value={preprocessingData.filter((d) => d.status === "Processed").length.toString()}
                    icon={FileCheck}
                    color="border-accent"
                    delay={0.3}
                    onClick={() => setActiveSection("preprocessing")}
                  />
                  <StatCard
                    title="Avg. Score"
                    value="86.9"
                    icon={TrendingUp}
                    color="border-chart-3"
                    delay={0.4}
                    onClick={() => setActiveSection("rekapan")}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl p-10 text-primary-foreground shadow-2xl"
                >
                  <h2
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Quick Start Guide
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold">1</span>
                      </div>
                      <h3 className="font-semibold mb-2 text-lg">Upload Data</h3>
                      <p className="text-sm text-primary-foreground/80">
                        Navigate to Data Pengajar and upload your teacher dataset
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <h3 className="font-semibold mb-2 text-lg">Process Data</h3>
                      <p className="text-sm text-primary-foreground/80">
                        Run pre-processing to clean and prepare your data
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold">3</span>
                      </div>
                      <h3 className="font-semibold mb-2 text-lg">View Results</h3>
                      <p className="text-sm text-primary-foreground/80">
                        Check classification results in the Rekapan section
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeSection === "pengajar" && (
              <motion.div
                key="pengajar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black text-foreground mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Data Pengajar
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg"
                  >
                    Manage and view teacher data records
                  </motion.p>
                </div>

                <UploadButton
                  onUpload={handleUpload}
                  label="Upload Teacher Data"
                />

                <DataTable
                  title="Teacher Records"
                  columns={[
                    { key: "no", label: "No" },
                    { key: "nama", label: "Nama Pengajar" },
                  ]}
                  data={pengajarData}
                />
              </motion.div>
            )}

            {activeSection === "rekapan" && (
              <motion.div
                key="rekapan"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black text-foreground mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Rekapan Klasifikasi
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg"
                  >
                    Classification results and performance summary
                  </motion.p>
                </div>

                <UploadButton
                  onUpload={handleUpload}
                  label="Upload Classification Results"
                />

                <DataTable
                  title="Classification Summary"
                  columns={[
                    { key: "no", label: "No" },
                    { key: "pengajar", label: "Pengajar" },
                    { key: "kategori", label: "Kategori" },
                    { key: "skor", label: "Skor" },
                  ]}
                  data={rekapanData}
                />
              </motion.div>
            )}

            {activeSection === "preprocessing" && (
              <motion.div
                key="preprocessing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black text-foreground mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Pre-Processing
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg"
                  >
                    Data preparation and processing pipeline
                  </motion.p>
                </div>

                <UploadButton
                  onUpload={handleUpload}
                  label="Upload Raw Dataset"
                />

                <DataTable
                  title="Processing History"
                  columns={[
                    { key: "no", label: "No" },
                    { key: "file", label: "File Name" },
                    { key: "status", label: "Status" },
                    { key: "tanggal", label: "Date" },
                  ]}
                  data={preprocessingData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
