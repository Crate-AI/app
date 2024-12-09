'use client';

import type { NextPage } from 'next';
import React, { useState } from 'react';
import * as realtimeBpm from 'realtime-bpm-analyzer';
import SubmitTrackForm from '@/components/SubmitTrackForm';

const Home: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadPending, setUploadPending] = useState(false);

  const onFileChange = async (file: File) => {
    setFile(file);

    const audioContext = new AudioContext();
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      audioContext.decodeAudioData(
        reader.result as ArrayBuffer,
        async (audioBuffer) => {
          const topCandidates =
            await realtimeBpm.analyzeFullBuffer(audioBuffer);
          console.log('topCandidates', topCandidates);
        },
      );
    });

    reader.readAsArrayBuffer(file);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadPending(true);

    // Simulate upload or processing logic
    setTimeout(() => {
      console.log('File uploaded:', file?.name);
      setUploadPending(false);
    }, 2000);
  };

  return (
    <div>
      <main>
        <SubmitTrackForm
          file={file}
          onFileChange={onFileChange}
          uploadPending={uploadPending}
          onSubmit={onSubmit}
        />
      </main>
    </div>
  );
};

export default Home;
