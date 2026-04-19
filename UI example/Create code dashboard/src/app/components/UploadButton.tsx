import { motion } from "motion/react";
import { Upload, FileUp } from "lucide-react";
import { useRef, useState } from "react";

interface UploadButtonProps {
  onUpload?: (file: File) => void;
  accept?: string;
  label?: string;
}

export function UploadButton({
  onUpload,
  accept = ".csv,.xlsx,.xls",
  label = "Upload Data",
}: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden border-2 border-dashed rounded-xl p-8 transition-all ${
          isDragging
            ? "border-secondary bg-secondary/10 scale-[1.02]"
            : "border-border bg-card hover:border-secondary/50 hover:bg-muted/30"
        }`}
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="p-4 bg-gradient-to-br from-secondary to-primary rounded-full"
            animate={{
              rotate: isDragging ? 360 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            {isDragging ? (
              <FileUp className="w-8 h-8 text-white" />
            ) : (
              <Upload className="w-8 h-8 text-white" />
            )}
          </motion.div>

          <div className="text-center">
            <p
              className="text-xl font-semibold text-foreground mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {isDragging ? "Drop file here" : label}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: CSV, Excel (.xlsx, .xls)
            </p>
          </div>

          <motion.button
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Choose File
          </motion.button>
        </motion.div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </motion.div>
  );
}
