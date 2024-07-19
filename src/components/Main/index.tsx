import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import useStore from "../../store";
import DropArea from "../DropArea";
import RadioOption from "../RadioOption";
import Stats from "../Stats";
import Switcher from "../Switcher";
import UploadImagesView from "../UploadImagesView";
import ValueSlider from "../ValueSlider";

export default function Main() {
  const [images, setImages] = useState<Array<File>>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const quality = useStore((state) => state.quality);
  const effort = useStore((state) => state.effort);
  const lossless = useStore((state) => state.lossless);
  const keepMetadata = useStore((state) => state.keepMetadata);
  const chromaSubsampling = useStore((state) => state.chromaSubsampling);

  const setQuality = useStore((state) => state.setQuality);
  const setEffort = useStore((state) => state.setEffort);
  const setLossless = useStore((state) => state.setLossless);
  const setKeepMetadata = useStore((state) => state.setKeepMetadata);
  const setChromaSubsampling = useStore((state) => state.setChromaSubsampling);
  const setStats = useStore((state) => state.setStats);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    images.forEach((file) => {
      formData.append("images", file);
    });

    // Добавляем флаги в formData
    formData.append("quality", quality.toString());
    formData.append("effort", effort.toString());
    formData.append("lossless", lossless.toString());
    formData.append("chromaSubsampling", chromaSubsampling);
    formData.append("keepMetadata", keepMetadata.toString());

    try {
      const response = await axios.post("http://localhost:8000/compress", formData, {
        responseType: "blob",
      });

      const statsHeader = response.headers["x-stats"];
      const stats = statsHeader ? JSON.parse(statsHeader) : null;
      setStats(stats);

      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
      <DropArea setImages={setImages} setDownloadUrl={setDownloadUrl} />

      {(images.length && <UploadImagesView images={images} onDelete={handleDeletImage} />) || null}

      <Box component={"form"} onSubmit={handleSubmit} sx={{ flexGrow: 2 }}>
        <Stack>
          <ValueSlider
            title="Качество"
            setValue={setQuality}
            min={1}
            max={100}
            defaultValue={50}
            desc="Компромисс между качеством изображения и размером файла. 1 - самое низкое качество изображения, но наименьший размер файла. 100 - самое высокое качество изображения, но наибольший размер файла.
"
          />
          <ValueSlider
            title="Усилие CPU"
            setValue={setEffort}
            min={0}
            max={9}
            defaultValue={4}
            desc="Этот параметр управляет тем, сколько процессорного времени будет потрачено на сжатие изображения. Чем больше значение, тем более интенсивно будет сжатие, что приведет к меньшему размеру файла, но это займет больше времени. Минимальное значение означает, что компрессия будет выполняться очень быстро, но размер выходного файла будет больше"
          />

          <Switcher
            checked={lossless}
            title="Сжатие без потерь"
            setValue={setLossless}
            desc="Изображение будет сжато без потерь, что означает, что все данные изображения сохраняются без изменений. Качество изображения остается неизменным и точно таким же, как у оригинала. Размер файла может быть больше по сравнению с сжатием с потерями (lossy compression), так как все детали изображения сохраняются. Подходит для случаев, когда важно сохранить максимальное качество изображения (например, для научных данных, архивирования или обработки изображений, где важны все детали)."
          />
          <Switcher
            checked={keepMetadata}
            title="Сохранить метаданные"
            setValue={setKeepMetadata}
            desc="Сохраняет всю дополнительную информацию об изображении, что может быть полезно для профессиональной обработки и архивирования. Удаление метаданных уменьшает размер файла и защищает личные данные, но теряет всю дополнительную информацию об изображении. Выбор значения зависит от ваших потребностей: приоритет сохранения информации или уменьшения размера файла и защиты данных."
          />

          <RadioOption
            title="Субдискретизация цвета"
            options={["4:4:4", "4:2:0"]}
            value={chromaSubsampling}
            desc="Метод уменьшения размера изображения, при котором сохраняется меньше цветовой информации, чтобы сэкономить место, поскольку человеческий глаз менее чувствителен к цвету, чем к яркости. 4:4:4 — все цвета сохраняются, лучшее качество, большой файл. 4:2:0 — сохраняются не все цвета, немного хуже качество, маленький файл."
            handleChange={(e, value) => setChromaSubsampling(value)}
          />
        </Stack>

        <Box textAlign="center">
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ maxWidth: 320 }}>
            {loading ? "Сжатие..." : "Начать сжатие"}
          </Button>
          <Stats />
        </Box>

        {downloadUrl && (
          <Box mt={2} textAlign="center">
            <Button href={downloadUrl} download="compressed_images.zip" variant="contained" color="success">
              Скачать сжатые изображения
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
