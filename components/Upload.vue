<template>
  <div>
    <p>Cosmic upload</p>
    <form enctype="multipart/form-data" @keypress.enter.prevent="tryUpload">
      <input type="file" name="file" @change="setImage" />
      <input type="text" v-model="guysName" @input="showName" />
      <button @click.prevent="tryUpload">Upload</button>
    </form>
    <div v-if="loading">Hold On</div>
  </div>
</template>

<script setup>
const loading = ref(false);
const image = ref(null);
const guysName = ref("");
function setImage(e) {
  image.value = e.target.files[0];
}
function showName(e) {
  guysName.value = e.target.value;

  //console.log(guysName.value);
}
async function tryUpload() {
  if (image.value !== null) {
    loading.value = true;
    const body = new FormData();
    body.append("file", image.value);
    body.append("guy-name", guysName.value);
    try {
      await $fetch("/api/files", {
        method: "POST",
        body,
      });
      //alert("File uploaded");
      //console.log(res);
      loading.value = false;
    } catch (error) {
      console.log(error.message);
      loading.value = false;
    }
    console.log();
  } else {
    alert("No file selected");
    return;
  }
}
</script>
