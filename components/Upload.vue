<template>
  <div>
    <p>Cosmic upload</p>
    <form enctype="multipart/form-data" @keyup.enter.prevent="tryUpload">
      <input type="file" name="file" @change="setImage" />
      <input type="text" v-model="guysName" @input="showName" />
      <button @click.prevent="tryUpload">Upload</button>
    </form>
  </div>
</template>

<script setup>
const image = ref(null);
const guysName = ref("");
async function setImage(e) {
  image.value = await e.target.files[0];
}
async function showName(e) {
  guysName.value = await e.target.value;

  console.log(guysName.value);
}
async function tryUpload() {
  if (image.value !== null) {
    const body = new FormData();
    body.append("file", image.value);
    body.append("guy-name", guysName.value);
    try {
      const res = await $fetch("/api/files", {
        method: "POST",
        body,
      });
      //alert("File uploaded");
alert(res) 
    } catch (error) {
      console.log(error.message);
    }
  } else {
    alert("No file selected");
    return;
  }
}
</script>

<style></style>
