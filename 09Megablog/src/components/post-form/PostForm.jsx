import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



export default function PostFrom({ post }) {
    const { register, handelSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userdata = useSelector((state => state.auth.userData));

    const submit = async (data) => {
        if(post) { 
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if(file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file ? file.$id : undefined
            });

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }else{
            const file = await appwriteService.uploadFile(data.image[0]);
            
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({...data, userId:userdata.$id});

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } 
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);


    
}